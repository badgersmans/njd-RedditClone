create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "post_id" uuid not null,
    "parent_id" uuid,
    "comment" text not null,
    "user_id" text default requesting_user_id()
);


alter table "public"."comments" enable row level security;

create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "image" text
);


create table "public"."posts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "title" text not null,
    "description" text,
    "image" text,
    "group_id" uuid not null,
    "user_id" text default requesting_user_id()
);


alter table "public"."posts" enable row level security;

create table "public"."upvotes" (
    "user_id" text not null default requesting_user_id(),
    "post_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."upvotes" enable row level security;

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX upvotes_pkey ON public.upvotes USING btree (user_id, post_id);

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."upvotes" add constraint "upvotes_pkey" PRIMARY KEY using index "upvotes_pkey";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."comments" add constraint "comments_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_post_id_fkey";

alter table "public"."posts" add constraint "posts_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."posts" validate constraint "posts_group_id_fkey";

alter table "public"."upvotes" add constraint "upvotes_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."upvotes" validate constraint "upvotes_post_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.requesting_user_id()
 RETURNS text
 LANGUAGE sql
AS $function$SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
)::text;$function$
;

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."posts" to "anon";

grant insert on table "public"."posts" to "anon";

grant references on table "public"."posts" to "anon";

grant select on table "public"."posts" to "anon";

grant trigger on table "public"."posts" to "anon";

grant truncate on table "public"."posts" to "anon";

grant update on table "public"."posts" to "anon";

grant delete on table "public"."posts" to "authenticated";

grant insert on table "public"."posts" to "authenticated";

grant references on table "public"."posts" to "authenticated";

grant select on table "public"."posts" to "authenticated";

grant trigger on table "public"."posts" to "authenticated";

grant truncate on table "public"."posts" to "authenticated";

grant update on table "public"."posts" to "authenticated";

grant delete on table "public"."posts" to "service_role";

grant insert on table "public"."posts" to "service_role";

grant references on table "public"."posts" to "service_role";

grant select on table "public"."posts" to "service_role";

grant trigger on table "public"."posts" to "service_role";

grant truncate on table "public"."posts" to "service_role";

grant update on table "public"."posts" to "service_role";

grant delete on table "public"."upvotes" to "anon";

grant insert on table "public"."upvotes" to "anon";

grant references on table "public"."upvotes" to "anon";

grant select on table "public"."upvotes" to "anon";

grant trigger on table "public"."upvotes" to "anon";

grant truncate on table "public"."upvotes" to "anon";

grant update on table "public"."upvotes" to "anon";

grant delete on table "public"."upvotes" to "authenticated";

grant insert on table "public"."upvotes" to "authenticated";

grant references on table "public"."upvotes" to "authenticated";

grant select on table "public"."upvotes" to "authenticated";

grant trigger on table "public"."upvotes" to "authenticated";

grant truncate on table "public"."upvotes" to "authenticated";

grant update on table "public"."upvotes" to "authenticated";

grant delete on table "public"."upvotes" to "service_role";

grant insert on table "public"."upvotes" to "service_role";

grant references on table "public"."upvotes" to "service_role";

grant select on table "public"."upvotes" to "service_role";

grant trigger on table "public"."upvotes" to "service_role";

grant truncate on table "public"."upvotes" to "service_role";

grant update on table "public"."upvotes" to "service_role";

create policy "INSERT_REQUESTOR_USERID"
on "public"."comments"
as permissive
for insert
to authenticated
with check ((requesting_user_id() = user_id));


create policy "REQUESTOR_HAS_USERID"
on "public"."comments"
as permissive
for select
to authenticated
using ((requesting_user_id() = user_id));


create policy "Allow delete only by owners"
on "public"."posts"
as permissive
for delete
to authenticated
using ((requesting_user_id() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."posts"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."posts"
as permissive
for select
to public
using (true);



