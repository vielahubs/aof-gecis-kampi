import assert from "node:assert/strict";
import test from "node:test";
import { examGuides, getPatternAnswer } from "../app/exam-guides";
import { historyDeepDives } from "../app/history-deep-dives";
import { courses, questions } from "../app/study-data";

const units = courses.flatMap((course) => course.units.map((unit, index) => ({ course, unit, unitNumber: index + 1 })));

test("keeps the v1 course and unit scope complete", () => {
  assert.equal(courses.length, 5);
  assert.equal(units.length, 40);
  assert.equal(new Set(courses.map((course) => course.code)).size, courses.length);
  assert.equal(new Set(units.map(({ unit }) => unit.id)).size, units.length);
  courses.forEach((course) => {
    assert.equal(course.units.length, 8, `${course.code} must have eight units`);
    assert.match(course.source, /^https:\/\//);
    assert.match(course.archiveSource, /^https:\/\//);
  });
});

test("keeps guides, deep dives and review cards complete", () => {
  assert.equal(Object.keys(examGuides).length, 40);
  assert.equal(Object.keys(historyDeepDives).length, 40);
  let cardCount = 0;
  units.forEach(({ unit }) => {
    const guide = examGuides[unit.id];
    assert.ok(guide, `missing guide for ${unit.id}`);
    assert.equal(guide.patterns.length, 3, `${unit.id} must have three review cards`);
    assert.ok(guide.lesson.length >= 2, `${unit.id} lesson is too short`);
    assert.ok(historyDeepDives[unit.id]?.length, `missing deep dive for ${unit.id}`);
    guide.patterns.forEach((pattern, index) => {
      assert.ok(pattern.trim(), `empty pattern in ${unit.id}`);
      assert.ok(getPatternAnswer(unit.id, index).trim(), `empty answer in ${unit.id}`);
      cardCount += 1;
    });
  });
  assert.equal(cardCount, 120);
});

test("keeps the question bank balanced and valid", () => {
  assert.equal(questions.length, 50);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
  courses.forEach((course) => {
    assert.equal(questions.filter((question) => question.course === course.code).length, 10, `${course.code} must have ten questions`);
  });
  units.forEach(({ course, unit, unitNumber }) => {
    assert.ok(questions.some((question) => question.course === course.code && question.unit === unitNumber), `missing question for ${unit.id}`);
  });
  questions.forEach((question) => {
    const course = courses.find((item) => item.code === question.course);
    assert.ok(course, `unknown course in ${question.id}`);
    assert.ok(question.unit >= 1 && question.unit <= (course?.units.length ?? 0), `invalid unit in ${question.id}`);
    assert.equal(question.options.length, 5, `${question.id} must have five options`);
    assert.ok(question.answer >= 0 && question.answer < question.options.length, `invalid answer in ${question.id}`);
    assert.ok(question.prompt.trim() && question.explanation.trim(), `missing text in ${question.id}`);
  });
});
