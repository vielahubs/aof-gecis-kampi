create or replace function public.can_join_room(target_room_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.rooms r
    where r.id = target_room_id
      and r.status = 'waiting'
      and (
        select count(*)
        from public.players p
        where p.room_id = r.id
      ) < 2
  );
$$;

revoke all
on function public.can_join_room(uuid)
from public;

grant execute
on function public.can_join_room(uuid)
to authenticated;

drop policy if exists "players_insert"
on public.players;

create policy "players_insert"
on public.players
for insert
to authenticated
with check (
  user_id = auth.uid()
  and public.can_join_room(room_id)
);

drop policy if exists "players_select"
on public.players;

create policy "players_select"
on public.players
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_room_member(room_id)
);
