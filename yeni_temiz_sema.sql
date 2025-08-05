--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'superadmin',
    'admin',
    'teacher',
    'student',
    'parent'
);


ALTER TYPE public.user_role OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: calculate_level(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculate_level(xp integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
  level INTEGER := 1;
  required_xp INTEGER := 0;
BEGIN
  WHILE xp >= required_xp LOOP
    level := level + 1;
    required_xp := required_xp + (level * 100);
  END LOOP;
  RETURN level - 1;
END;
$$;


ALTER FUNCTION public.calculate_level(xp integer) OWNER TO postgres;

--
-- Name: create_user_profile(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_user_profile() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  user_role TEXT;
  user_full_name TEXT;
  user_grade INTEGER;
BEGIN
  -- Yeni kullanıcının metadata'sından rol, isim ve sınıf bilgilerini al.
  -- Eğer bu bilgiler yoksa, rol için varsayılan olarak 'student' ata.
  IF NEW.raw_user_meta_data IS NOT NULL THEN
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
    user_full_name := NEW.raw_user_meta_data->>'full_name';
    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;
  ELSE
    user_role := 'student';
  END IF;

  -- `user_profiles` tablosuna yeni kullanıcı bilgilerini ekle.
  -- Eğer aynı user_id ile bir kayıt zaten varsa, çakışmayı önle ve güncelle.
  INSERT INTO public.user_profiles (user_id, role, full_name, email, grade)
  VALUES (NEW.id, user_role::public.user_role, user_full_name, NEW.email, user_grade)
  ON CONFLICT (user_id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    grade = EXCLUDED.grade,
    updated_at = NOW();

  -- `user_stats` tablosuna başlangıç kaydını ekle.
  -- Çakışma durumunda hiçbir şey yapma.
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- `user_streaks` tablosuna başlangıç kaydını ekle.
  -- Çakışma durumunda hiçbir şey yapma.
  INSERT INTO public.user_streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.create_user_profile() OWNER TO postgres;

--
-- Name: update_user_profile_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_user_profile_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_user_profile_timestamp() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analytics_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    event_type text NOT NULL,
    event_data jsonb,
    session_id text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.analytics_events OWNER TO postgres;

--
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    subject character varying(50) DEFAULT 'math'::character varying,
    grade integer,
    topic character varying(255),
    content_type character varying(20),
    content_data jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    creator_id uuid,
    CONSTRAINT content_content_type_check CHECK (((content_type)::text = ANY ((ARRAY['lesson'::character varying, 'quiz'::character varying])::text[])))
);


ALTER TABLE public.content OWNER TO postgres;

--
-- Name: daily_leaderboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_leaderboard (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    username text NOT NULL,
    avatar_url text,
    daily_points integer DEFAULT 0,
    rank integer,
    date date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.daily_leaderboard OWNER TO postgres;

--
-- Name: parent_student_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parent_student_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    parent_id uuid,
    student_id uuid,
    status text DEFAULT 'pending'::text,
    invited_at timestamp without time zone DEFAULT now(),
    confirmed_at timestamp without time zone,
    invited_email text
);


ALTER TABLE public.parent_student_links OWNER TO postgres;

--
-- Name: point_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.point_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    points integer NOT NULL,
    reason text NOT NULL,
    quiz_id uuid,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT point_history_reason_check CHECK ((reason = ANY (ARRAY['quiz_completion'::text, 'streak_bonus'::text, 'achievement'::text, 'daily_login'::text, 'speed_bonus'::text, 'perfect_score'::text])))
);


ALTER TABLE public.point_history OWNER TO postgres;

--
-- Name: quiz_assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    quiz_id uuid NOT NULL,
    assigned_to_user_id uuid,
    assigned_to_grade integer,
    assigned_by uuid NOT NULL
);


ALTER TABLE public.quiz_assignments OWNER TO postgres;

--
-- Name: quiz_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_attempts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    student_id uuid,
    quiz_id uuid,
    score numeric(5,2),
    answers jsonb,
    time_spent integer,
    completed_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.quiz_attempts OWNER TO postgres;

--
-- Name: teacher_applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_applications (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(20),
    subjects text[],
    experience text,
    status character varying(20) DEFAULT 'pending'::character varying,
    applied_at timestamp without time zone DEFAULT now(),
    reviewed_at timestamp without time zone,
    reviewed_by uuid
);


ALTER TABLE public.teacher_applications OWNER TO postgres;

--
-- Name: teacher_student_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_student_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    teacher_id uuid NOT NULL,
    student_id uuid NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);


ALTER TABLE public.teacher_student_links OWNER TO postgres;

--
-- Name: user_badges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_badges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    badge_id text NOT NULL,
    badge_name text NOT NULL,
    badge_description text,
    badge_icon text,
    badge_category text,
    badge_rarity text,
    points_reward integer DEFAULT 0,
    awarded_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_badges_badge_category_check CHECK ((badge_category = ANY (ARRAY['achievement'::text, 'streak'::text, 'quiz'::text, 'social'::text]))),
    CONSTRAINT user_badges_badge_rarity_check CHECK ((badge_rarity = ANY (ARRAY['common'::text, 'rare'::text, 'epic'::text, 'legendary'::text])))
);


ALTER TABLE public.user_badges OWNER TO postgres;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    total_xp integer DEFAULT 0,
    level integer DEFAULT 1,
    avatar text,
    display_name text,
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    full_name text,
    email text,
    role public.user_role DEFAULT 'student'::public.user_role NOT NULL,
    grade integer
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: user_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_stats (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    total_quizzes_completed integer DEFAULT 0,
    total_correct_answers integer DEFAULT 0,
    total_incorrect_answers integer DEFAULT 0,
    average_accuracy numeric(5,2) DEFAULT 0,
    total_time_spent integer DEFAULT 0,
    total_points_earned integer DEFAULT 0,
    favorite_subject text,
    last_activity timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_stats OWNER TO postgres;

--
-- Name: user_streaks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_streaks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    current_streak integer DEFAULT 0,
    longest_streak integer DEFAULT 0,
    last_activity_date date DEFAULT CURRENT_DATE,
    streak_type text DEFAULT 'daily'::text,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_streaks_streak_type_check CHECK ((streak_type = ANY (ARRAY['daily'::text, 'weekly'::text, 'quiz'::text])))
);


ALTER TABLE public.user_streaks OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: seed_files; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.seed_files (
    path text NOT NULL,
    hash text NOT NULL
);


ALTER TABLE supabase_migrations.seed_files OWNER TO postgres;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	024321f1-26f5-43fc-b1f2-54bb8d379244	{"action":"user_confirmation_requested","actor_id":"c7247095-7be9-440c-bc72-ca814e6393b1","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-02 14:14:57.918414+00	
00000000-0000-0000-0000-000000000000	acbf62d9-db7d-4f60-903e-631bf9048f07	{"action":"user_signedup","actor_id":"c7247095-7be9-440c-bc72-ca814e6393b1","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-02 14:19:48.534981+00	
00000000-0000-0000-0000-000000000000	5305517a-6b93-4f5c-af2c-ed5609014664	{"action":"login","actor_id":"c7247095-7be9-440c-bc72-ca814e6393b1","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 14:24:06.113218+00	
00000000-0000-0000-0000-000000000000	aaf9bed2-8739-47a9-93c1-d954228d2f12	{"action":"login","actor_id":"c7247095-7be9-440c-bc72-ca814e6393b1","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 14:26:33.197348+00	
00000000-0000-0000-0000-000000000000	568a07a9-6d35-4178-91d1-234ff4686099	{"action":"login","actor_id":"c7247095-7be9-440c-bc72-ca814e6393b1","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 14:30:53.266319+00	
00000000-0000-0000-0000-000000000000	70bb8b20-1383-469f-a9ab-21d8173378f9	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tural.musab.osmanli@gmail.com","user_id":"c7247095-7be9-440c-bc72-ca814e6393b1","user_phone":""}}	2025-08-02 15:11:01.733407+00	
00000000-0000-0000-0000-000000000000	e2efc776-c6cd-4210-98f5-0edc4271a952	{"action":"user_confirmation_requested","actor_id":"273f8a61-c60f-4353-9a41-159ef6db25a7","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-02 15:12:10.490661+00	
00000000-0000-0000-0000-000000000000	4df08a86-6e90-4b04-acac-d50e427af9ba	{"action":"user_signedup","actor_id":"273f8a61-c60f-4353-9a41-159ef6db25a7","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-02 15:12:43.845229+00	
00000000-0000-0000-0000-000000000000	e9b3c848-cf31-4a9e-907a-1f17e018c46c	{"action":"login","actor_id":"273f8a61-c60f-4353-9a41-159ef6db25a7","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 15:13:07.142417+00	
00000000-0000-0000-0000-000000000000	c51b6155-bbdf-4358-b092-221538459342	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tural_mamedov@hotmail.com","user_id":"273f8a61-c60f-4353-9a41-159ef6db25a7","user_phone":""}}	2025-08-02 15:22:54.239557+00	
00000000-0000-0000-0000-000000000000	78abec83-d23c-47c7-8e76-d38d950d2186	{"action":"user_confirmation_requested","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-02 15:23:25.764542+00	
00000000-0000-0000-0000-000000000000	9185b27c-8476-43fe-aeeb-2e38cde35ff9	{"action":"user_signedup","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-02 15:24:26.07524+00	
00000000-0000-0000-0000-000000000000	46f2b206-eefd-4bb6-a369-591a35fc0a1f	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 15:25:13.281146+00	
00000000-0000-0000-0000-000000000000	e92b29f6-2bf1-4591-a41c-8195dde0d01a	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 15:45:05.247304+00	
00000000-0000-0000-0000-000000000000	c6c8de41-0019-4275-9e22-9fd6ef0d5c28	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 15:47:14.664154+00	
00000000-0000-0000-0000-000000000000	2b69bf5a-dec8-4235-b9f6-63ea8a259754	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 15:47:18.293413+00	
00000000-0000-0000-0000-000000000000	c15e564c-1898-4a6d-b4fa-ebf04b84b3b8	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 15:54:34.780544+00	
00000000-0000-0000-0000-000000000000	9f0c4fdc-616c-4641-96c5-d6a682c5ac8b	{"action":"user_recovery_requested","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 15:55:23.754087+00	
00000000-0000-0000-0000-000000000000	b7f0870d-4b18-427f-8702-58822eb1c5b7	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 15:55:41.243601+00	
00000000-0000-0000-0000-000000000000	1414d551-cd97-498d-8726-c3ef2a0a4394	{"action":"user_recovery_requested","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 16:03:06.082224+00	
00000000-0000-0000-0000-000000000000	cf446c10-6039-4e57-9f44-8bae1e958bcb	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 16:03:19.588938+00	
00000000-0000-0000-0000-000000000000	b315c3ce-467d-4356-b091-2b5a03e9195b	{"action":"user_recovery_requested","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 16:07:25.490216+00	
00000000-0000-0000-0000-000000000000	32049008-17fd-4255-b00d-c8f92eb3f5e5	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 16:07:42.312981+00	
00000000-0000-0000-0000-000000000000	2abe262e-52ad-4689-a8c4-482c3c73082b	{"action":"user_recovery_requested","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 16:17:34.952884+00	
00000000-0000-0000-0000-000000000000	b62832ab-c8c3-41bf-b6c9-76dfaf04d51c	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 16:17:52.41143+00	
00000000-0000-0000-0000-000000000000	dc994b7b-5789-4c1e-bec5-7545e2be17cd	{"action":"user_updated_password","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 16:18:03.613307+00	
00000000-0000-0000-0000-000000000000	8e401904-8a03-4719-9df3-28d91545e006	{"action":"user_modified","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 16:18:03.613954+00	
00000000-0000-0000-0000-000000000000	6f19ac21-6150-493f-a785-7d0627ee2888	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 16:18:12.313811+00	
00000000-0000-0000-0000-000000000000	c8d420f2-7dd6-4279-9e74-17150acf0eac	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 16:18:16.57555+00	
00000000-0000-0000-0000-000000000000	785ffd38-e394-44eb-8282-a02c0756bd14	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 17:02:12.620325+00	
00000000-0000-0000-0000-000000000000	8acdbad3-740c-40d4-ab05-ce1a120398b5	{"action":"user_confirmation_requested","actor_id":"fb859511-c1d8-478a-9265-8be60a1fea5f","actor_username":"musab.tural.osmanli@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-02 17:08:43.910858+00	
00000000-0000-0000-0000-000000000000	d535d2f0-0e7d-4513-a7fc-db9bfcc8d3b7	{"action":"user_confirmation_requested","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-02 17:21:04.037747+00	
00000000-0000-0000-0000-000000000000	bf8e7c0f-024b-48ca-aac7-e3e08d59024d	{"action":"user_signedup","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-02 17:21:27.133727+00	
00000000-0000-0000-0000-000000000000	c2cb4750-1f60-482d-a315-069c0463b6d8	{"action":"user_recovery_requested","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 17:34:20.450212+00	
00000000-0000-0000-0000-000000000000	3b3dcc22-1711-4193-b313-332545887dc8	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 17:34:29.766539+00	
00000000-0000-0000-0000-000000000000	1d53b22d-92b7-482a-afff-090f5946ce0e	{"action":"user_updated_password","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 17:34:45.826301+00	
00000000-0000-0000-0000-000000000000	2d16e1e1-a3a7-4a63-b369-fa1b0a8f9775	{"action":"user_modified","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 17:34:45.828094+00	
00000000-0000-0000-0000-000000000000	1163248a-8883-437a-aa2d-15b4ff7a0a13	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 17:35:00.247629+00	
00000000-0000-0000-0000-000000000000	626d2d01-bda9-4e8f-baac-6981a2d1f558	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"turan.musab.osman@icloud.com","user_id":"db6de2e5-6881-4060-9118-be991fb525b9","user_phone":""}}	2025-08-02 18:38:36.747856+00	
00000000-0000-0000-0000-000000000000	28d3f9c3-5cc0-4481-8260-154757e9e6e1	{"action":"token_refreshed","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 18:43:06.977581+00	
00000000-0000-0000-0000-000000000000	90fea942-c4df-46e7-b456-846a990ffb51	{"action":"token_revoked","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 18:43:06.981334+00	
00000000-0000-0000-0000-000000000000	cf22bb65-6d35-4417-af5a-d1f639295d6f	{"action":"login","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 18:43:25.095991+00	
00000000-0000-0000-0000-000000000000	2943fe90-a06c-4bc3-ae8f-ae066c95820a	{"action":"token_refreshed","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 19:57:04.46923+00	
00000000-0000-0000-0000-000000000000	38ae6dfc-3f7e-4abf-ad20-d6fa8d85e375	{"action":"token_revoked","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 19:57:04.476582+00	
00000000-0000-0000-0000-000000000000	0d0ccdbf-60d7-443e-9e78-8b71971e0ead	{"action":"user_recovery_requested","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-02 20:16:55.344471+00	
00000000-0000-0000-0000-000000000000	c80eedda-3dbc-4ca5-80d3-4105a0a56822	{"action":"token_refreshed","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 20:57:01.356052+00	
00000000-0000-0000-0000-000000000000	41e251e8-3ac4-4a27-b3dc-01207d4705bd	{"action":"token_revoked","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 20:57:01.367898+00	
00000000-0000-0000-0000-000000000000	192fe0e4-0e0e-4d5f-98b6-9fcbd3eb6bf9	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:10:27.839687+00	
00000000-0000-0000-0000-000000000000	07b546d1-98f7-468c-9692-47e6742227e3	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:17:56.507832+00	
00000000-0000-0000-0000-000000000000	b58874d3-f2c5-4c50-8cca-6c3556b8d46e	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:25:23.958657+00	
00000000-0000-0000-0000-000000000000	73c0a709-b5e4-44ae-a879-184f1b4d5adb	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:37:27.343251+00	
00000000-0000-0000-0000-000000000000	2bf2e3c1-17a1-4b0b-a785-afc5e6fd11d1	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 21:37:34.304325+00	
00000000-0000-0000-0000-000000000000	ae95aa1e-0fdc-45eb-9810-ff2e143bf8ad	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:37:40.352129+00	
00000000-0000-0000-0000-000000000000	72cef103-bb3f-4b9d-aad6-d0d20a442fcf	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 21:42:59.099525+00	
00000000-0000-0000-0000-000000000000	2bc9f793-48f4-4611-b728-7cb79a54837b	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:43:02.455506+00	
00000000-0000-0000-0000-000000000000	1bd775ee-840e-4584-9207-b604bb693ec9	{"action":"logout","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 21:43:13.591134+00	
00000000-0000-0000-0000-000000000000	9e20d51d-2774-4673-b260-0e947420292a	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:43:17.547785+00	
00000000-0000-0000-0000-000000000000	3e9c3fa4-78a4-443c-88c7-8fe1e47a8edd	{"action":"logout","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 21:43:20.853822+00	
00000000-0000-0000-0000-000000000000	cf751e41-f998-4567-8a0f-10316ef308d4	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:43:24.596837+00	
00000000-0000-0000-0000-000000000000	401f24d2-d8de-43a0-b1d9-319e0880bd93	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-02 21:43:27.62+00	
00000000-0000-0000-0000-000000000000	4b843159-e66d-4a7c-8eb0-9ef71cb37990	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"mr.turfaldino@gmail.com","user_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","user_phone":""}}	2025-08-02 21:49:10.864515+00	
00000000-0000-0000-0000-000000000000	6b6ead7d-996e-40fc-8785-0fa971eca792	{"action":"login","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 21:51:01.86538+00	
00000000-0000-0000-0000-000000000000	fd621759-fedb-4d0a-ba73-976a3f3c8c54	{"action":"login","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-02 22:04:12.169089+00	
00000000-0000-0000-0000-000000000000	aadf8938-d1a5-4ec8-b787-1bb44b02d0e7	{"action":"token_refreshed","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 23:02:17.904346+00	
00000000-0000-0000-0000-000000000000	a80aae01-b94c-43bc-9e0f-c442b393e246	{"action":"token_revoked","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-02 23:02:17.927069+00	
00000000-0000-0000-0000-000000000000	904ea43d-63b5-4a09-a7f9-5ff81b5e4308	{"action":"token_refreshed","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 00:00:59.949388+00	
00000000-0000-0000-0000-000000000000	f0ae3914-3164-4c72-9c89-13bc2cd37804	{"action":"token_revoked","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 00:00:59.963379+00	
00000000-0000-0000-0000-000000000000	a3e48957-9108-4ef3-9d70-11db72c8e07b	{"action":"token_refreshed","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 01:18:06.049537+00	
00000000-0000-0000-0000-000000000000	eb8fa023-b168-4e55-84f1-c2916ad708a0	{"action":"token_revoked","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 01:18:06.067662+00	
00000000-0000-0000-0000-000000000000	a57704ad-b54c-4330-829e-32f5d06e175f	{"action":"login","actor_id":"b0ac676c-e17b-4857-9de4-f67f655572b8","actor_username":"mr.turfaldino@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:39:10.671957+00	
00000000-0000-0000-0000-000000000000	e5f7080e-1009-43af-9599-093aca430b04	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:39:29.408611+00	
00000000-0000-0000-0000-000000000000	bc2bbac5-9977-400b-a6ad-61085b89bf7f	{"action":"logout","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-03 01:40:12.138954+00	
00000000-0000-0000-0000-000000000000	8b65e9f4-8ad8-4e34-8af2-f8744b1b2a3c	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:40:25.640412+00	
00000000-0000-0000-0000-000000000000	9b74ecfb-ff07-4d13-9c0c-bbde3d7a3bab	{"action":"login","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:42:01.75071+00	
00000000-0000-0000-0000-000000000000	7a9f7d12-a8b1-4598-ab02-cc3831bc0cf1	{"action":"logout","actor_id":"297f934c-8d73-48d0-9d2a-5c5d51d244d6","actor_username":"tural.musab.osmanli@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-03 01:42:50.437122+00	
00000000-0000-0000-0000-000000000000	b93caeb3-3100-4c3f-b1f4-2a70b45fb37b	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:45:30.254272+00	
00000000-0000-0000-0000-000000000000	8dd1a8dc-f2c1-403b-b63a-9d9a08db9c68	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-03 01:47:21.319402+00	
00000000-0000-0000-0000-000000000000	8bc9e13e-b1e0-4704-a844-dee505e75a92	{"action":"login","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 01:48:05.855128+00	
00000000-0000-0000-0000-000000000000	f5ea9cd1-de23-4960-a14e-07c056910a7e	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 22:44:55.546009+00	
00000000-0000-0000-0000-000000000000	96132834-86d5-41a2-860b-5c0d808c53c7	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-03 22:49:44.985698+00	
00000000-0000-0000-0000-000000000000	eec84cd2-470d-4296-9794-b5de15e12e88	{"action":"token_refreshed","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 23:11:32.126469+00	
00000000-0000-0000-0000-000000000000	4ae445db-3147-4be7-9fb7-cf5d7454988c	{"action":"token_revoked","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"token"}	2025-08-03 23:11:32.131473+00	
00000000-0000-0000-0000-000000000000	afe11b84-45e9-4d3f-ab87-c8a50a0de64b	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 00:06:09.625541+00	
00000000-0000-0000-0000-000000000000	0c749bfc-d54b-4a5c-b39f-8c53aa8ce7a8	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 00:14:26.710066+00	
00000000-0000-0000-0000-000000000000	c4394069-2cf2-462f-91f3-45ddaf55f889	{"action":"logout","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-04 00:16:49.919318+00	
00000000-0000-0000-0000-000000000000	d6b9fff8-d5d9-4ed6-bd51-a3fc9a7cb43e	{"action":"login","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 00:17:49.411414+00	
00000000-0000-0000-0000-000000000000	89b263a5-99c7-46ad-8d86-8b806e5c2425	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 09:38:50.296846+00	
00000000-0000-0000-0000-000000000000	9fc05c29-7af4-4a0e-8ac7-06abdd97f0d5	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 09:40:58.601133+00	
00000000-0000-0000-0000-000000000000	fd0f0079-2b36-4087-a011-0553474ca68b	{"action":"login","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 09:44:55.381131+00	
00000000-0000-0000-0000-000000000000	4367b7a8-775a-4a19-9836-e23e37b1e040	{"action":"logout","actor_id":"db6de2e5-6881-4060-9118-be991fb525b9","actor_username":"turan.musab.osman@icloud.com","actor_via_sso":false,"log_type":"account"}	2025-08-04 09:45:12.617516+00	
00000000-0000-0000-0000-000000000000	fdc4cef4-d9b9-413b-99b6-0681b97352ac	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 09:45:38.463618+00	
00000000-0000-0000-0000-000000000000	041337ce-982b-45e8-9fe7-f9d947ceef55	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:04:03.739484+00	
00000000-0000-0000-0000-000000000000	91824c8f-9593-4faa-b9d2-3ad5c9833194	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:11:52.169236+00	
00000000-0000-0000-0000-000000000000	527cf1ee-ca05-483e-b8e8-7277aeeed189	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:15:19.940822+00	
00000000-0000-0000-0000-000000000000	fea41c0d-ac14-4962-8caf-5020cd5f218f	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:25:52.468695+00	
00000000-0000-0000-0000-000000000000	d861a8a3-8226-4e61-8f5e-faafc8129542	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:29:31.667775+00	
00000000-0000-0000-0000-000000000000	8b6c37f9-1c5e-4776-bd06-9df6363709d7	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:34:21.393559+00	
00000000-0000-0000-0000-000000000000	51d213db-946b-403e-8c94-bb2e34ae8769	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 10:51:25.349695+00	
00000000-0000-0000-0000-000000000000	e793821c-94ff-4be6-94dd-40f335893747	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 11:07:12.037252+00	
00000000-0000-0000-0000-000000000000	04799dea-0e55-4887-b259-1be8ec40765d	{"action":"token_refreshed","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 12:21:08.349906+00	
00000000-0000-0000-0000-000000000000	8c4b4f0e-a259-4f45-adfc-415c4567c682	{"action":"token_revoked","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 12:21:08.359085+00	
00000000-0000-0000-0000-000000000000	db60ff00-a2e5-4861-a3b2-9de25d1f9994	{"action":"token_refreshed","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 22:20:03.356203+00	
00000000-0000-0000-0000-000000000000	abca0ab2-9b37-46b3-9288-1cfe4e1d8344	{"action":"token_revoked","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 22:20:03.371712+00	
00000000-0000-0000-0000-000000000000	81b6f37a-ca66-4b99-b2c3-785721cb6b47	{"action":"token_refreshed","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 22:46:25.651043+00	
00000000-0000-0000-0000-000000000000	91d0cb52-c3c3-49c8-b27b-23525c56ee55	{"action":"token_revoked","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-04 22:46:25.662007+00	
00000000-0000-0000-0000-000000000000	0bd44195-77f5-488b-ad6f-c703b9f501de	{"action":"login","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-04 22:56:20.224446+00	
00000000-0000-0000-0000-000000000000	558d137e-20e6-491d-a935-9657dc2d596b	{"action":"token_refreshed","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:13:54.4751+00	
00000000-0000-0000-0000-000000000000	1d061937-8ff2-4fb4-90b8-5dd2c43250f6	{"action":"token_revoked","actor_id":"f398ef4e-d95a-4354-8851-edc9ba629580","actor_username":"tural_mamedov@hotmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:13:54.498086+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
f398ef4e-d95a-4354-8851-edc9ba629580	f398ef4e-d95a-4354-8851-edc9ba629580	{"sub": "f398ef4e-d95a-4354-8851-edc9ba629580", "email": "tural_mamedov@hotmail.com", "email_verified": true, "phone_verified": false}	email	2025-08-02 15:23:25.757952+00	2025-08-02 15:23:25.758008+00	2025-08-02 15:23:25.758008+00	fdf65aa2-ca39-44e6-a8cb-241139b4a90f
fb859511-c1d8-478a-9265-8be60a1fea5f	fb859511-c1d8-478a-9265-8be60a1fea5f	{"sub": "fb859511-c1d8-478a-9265-8be60a1fea5f", "email": "musab.tural.osmanli@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-08-02 17:08:43.907433+00	2025-08-02 17:08:43.907488+00	2025-08-02 17:08:43.907488+00	66c55278-1eb0-4d7b-b51c-13f3a7db4b5f
297f934c-8d73-48d0-9d2a-5c5d51d244d6	297f934c-8d73-48d0-9d2a-5c5d51d244d6	{"sub": "297f934c-8d73-48d0-9d2a-5c5d51d244d6", "email": "tural.musab.osmanli@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-08-02 17:21:04.032786+00	2025-08-02 17:21:04.032843+00	2025-08-02 17:21:04.032843+00	9d2f9fa1-b63b-4336-b22c-5f01c212fc17
db6de2e5-6881-4060-9118-be991fb525b9	db6de2e5-6881-4060-9118-be991fb525b9	{"sub": "db6de2e5-6881-4060-9118-be991fb525b9", "email": "turan.musab.osman@icloud.com", "email_verified": false, "phone_verified": false}	email	2025-08-02 18:38:36.745277+00	2025-08-02 18:38:36.745336+00	2025-08-02 18:38:36.745336+00	a1f3b9c4-770e-4ae1-9dcd-fe2203dd6d47
b0ac676c-e17b-4857-9de4-f67f655572b8	b0ac676c-e17b-4857-9de4-f67f655572b8	{"sub": "b0ac676c-e17b-4857-9de4-f67f655572b8", "email": "mr.turfaldino@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-08-02 21:49:10.85956+00	2025-08-02 21:49:10.859618+00	2025-08-02 21:49:10.859618+00	b3cebcfb-8546-40e6-968a-b9a4b70e758e
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
749d3512-d329-448f-91ac-fd5bad771440	2025-08-02 21:51:01.882361+00	2025-08-02 21:51:01.882361+00	password	3cbb8b74-a263-490f-8515-e3b2d2b5269e
ed1e137f-e530-43ab-a302-fe607fa6e21d	2025-08-02 22:04:12.190224+00	2025-08-02 22:04:12.190224+00	password	3e2eb90e-5bf3-4a44-9df1-523145f8262b
be7e3ce6-9d93-47dc-b651-6dc4c700a2d7	2025-08-03 01:39:10.731719+00	2025-08-03 01:39:10.731719+00	password	2a89023d-4077-4f74-a67a-97837593f334
424f5029-8e7c-4799-8bbd-c46263ea2516	2025-08-04 09:38:50.404524+00	2025-08-04 09:38:50.404524+00	password	dbd5cb8a-3b4f-41d5-800a-e59ae1bae552
beee20eb-be68-4a78-b109-e606145a8ac3	2025-08-04 09:40:58.618798+00	2025-08-04 09:40:58.618798+00	password	1b271049-65d5-4148-b24b-7a215d410bf6
a129d51b-4a04-4538-bc1a-b722f46f8289	2025-08-04 09:45:38.467369+00	2025-08-04 09:45:38.467369+00	password	0a4254fa-ba03-46f7-8904-d06125ffe680
2a097980-1dda-4125-8aa7-215bea4a3d30	2025-08-04 10:04:03.775241+00	2025-08-04 10:04:03.775241+00	password	020cbf78-d836-4989-a562-36e8882c103d
416d1c52-a09d-4d2b-a763-40e842112293	2025-08-04 10:11:52.177292+00	2025-08-04 10:11:52.177292+00	password	2e9954d4-d3bc-499f-86f1-dcfafce594f5
4aab8d6c-e5c8-4013-8e94-969d0c76c96a	2025-08-04 10:15:19.953671+00	2025-08-04 10:15:19.953671+00	password	dcff0e68-c1aa-4967-88d8-3d40623edfb4
ed55b093-23cd-4b11-afc9-0d9e574dcad9	2025-08-04 10:25:52.482856+00	2025-08-04 10:25:52.482856+00	password	b250bb26-919c-4b57-b439-c1bacc52452f
4ed19a20-d8c1-4774-bbbe-5d85c75e9659	2025-08-04 10:29:31.675606+00	2025-08-04 10:29:31.675606+00	password	ddff1f21-3b82-4697-a877-ca3a2c6452d3
272fec4c-1e37-4c28-90d1-a01c45f5f16d	2025-08-04 10:34:21.404749+00	2025-08-04 10:34:21.404749+00	password	3b4a2987-3d8f-47d7-b70f-d43fd574eea7
87dab571-d079-4d28-8463-710e12a395e1	2025-08-04 10:51:25.399657+00	2025-08-04 10:51:25.399657+00	password	c3ebadf9-0fc4-4ffb-9a56-e9547e50e344
97ddea04-a088-4f66-9a7b-4b7b5d0189d6	2025-08-04 11:07:12.063683+00	2025-08-04 11:07:12.063683+00	password	68fc68f9-bd3b-4ecf-a023-57850e2992a9
1f896390-b796-443f-b01b-d11f589c2322	2025-08-04 22:56:20.276322+00	2025-08-04 22:56:20.276322+00	password	ae664960-ec2e-4b74-a563-70b5c9050887
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
17c97539-34b3-4350-a5f8-a939acd6bb5b	fb859511-c1d8-478a-9265-8be60a1fea5f	confirmation_token	7386fb6c76e4e902c4c139b8c7defce3bb58b5c9c8b70b5af498bc65	musab.tural.osmanli@gmail.com	2025-08-02 17:08:44.71221	2025-08-02 17:08:44.71221
8e8b2c1f-52d2-4023-9166-3c4ca6075a39	297f934c-8d73-48d0-9d2a-5c5d51d244d6	recovery_token	5fbed5eeb022f2bb1f2bdebe2bbe804ee2920df4e9988029a071f8cb	tural.musab.osmanli@gmail.com	2025-08-02 20:16:56.268924	2025-08-02 20:16:56.268924
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	53	6p37gmkliegd	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 10:04:03.766066+00	2025-08-04 10:04:03.766066+00	\N	2a097980-1dda-4125-8aa7-215bea4a3d30
00000000-0000-0000-0000-000000000000	54	uipsmcaq3pwh	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 10:11:52.173637+00	2025-08-04 10:11:52.173637+00	\N	416d1c52-a09d-4d2b-a763-40e842112293
00000000-0000-0000-0000-000000000000	55	67feay5zjjd4	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 10:15:19.950017+00	2025-08-04 10:15:19.950017+00	\N	4aab8d6c-e5c8-4013-8e94-969d0c76c96a
00000000-0000-0000-0000-000000000000	56	mtr2nih2h6xh	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 10:25:52.479548+00	2025-08-04 10:25:52.479548+00	\N	ed55b093-23cd-4b11-afc9-0d9e574dcad9
00000000-0000-0000-0000-000000000000	57	gtvkaunfmryi	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 10:29:31.672508+00	2025-08-04 10:29:31.672508+00	\N	4ed19a20-d8c1-4774-bbbe-5d85c75e9659
00000000-0000-0000-0000-000000000000	60	j7wnapdcxvo5	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 11:07:12.056088+00	2025-08-04 11:07:12.056088+00	\N	97ddea04-a088-4f66-9a7b-4b7b5d0189d6
00000000-0000-0000-0000-000000000000	59	4pp4equbebo4	f398ef4e-d95a-4354-8851-edc9ba629580	t	2025-08-04 10:51:25.366276+00	2025-08-04 12:21:08.362995+00	\N	87dab571-d079-4d28-8463-710e12a395e1
00000000-0000-0000-0000-000000000000	61	zbycpjhnhu6u	f398ef4e-d95a-4354-8851-edc9ba629580	t	2025-08-04 12:21:08.37087+00	2025-08-04 22:20:03.375135+00	4pp4equbebo4	87dab571-d079-4d28-8463-710e12a395e1
00000000-0000-0000-0000-000000000000	62	5i2z4mjiyg7n	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 22:20:03.392828+00	2025-08-04 22:20:03.392828+00	zbycpjhnhu6u	87dab571-d079-4d28-8463-710e12a395e1
00000000-0000-0000-0000-000000000000	58	crhpgp54d6pf	f398ef4e-d95a-4354-8851-edc9ba629580	t	2025-08-04 10:34:21.399923+00	2025-08-04 22:46:25.66529+00	\N	272fec4c-1e37-4c28-90d1-a01c45f5f16d
00000000-0000-0000-0000-000000000000	63	xo6gmfmp5lrp	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 22:46:25.678445+00	2025-08-04 22:46:25.678445+00	crhpgp54d6pf	272fec4c-1e37-4c28-90d1-a01c45f5f16d
00000000-0000-0000-0000-000000000000	64	auhdxs5ofcdm	f398ef4e-d95a-4354-8851-edc9ba629580	t	2025-08-04 22:56:20.24999+00	2025-08-05 08:13:54.50019+00	\N	1f896390-b796-443f-b01b-d11f589c2322
00000000-0000-0000-0000-000000000000	65	v2cfw564b34c	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-05 08:13:54.528091+00	2025-08-05 08:13:54.528091+00	auhdxs5ofcdm	1f896390-b796-443f-b01b-d11f589c2322
00000000-0000-0000-0000-000000000000	32	oahdao4b5w2n	b0ac676c-e17b-4857-9de4-f67f655572b8	f	2025-08-02 21:51:01.875617+00	2025-08-02 21:51:01.875617+00	\N	749d3512-d329-448f-91ac-fd5bad771440
00000000-0000-0000-0000-000000000000	33	mrdf3tr7ge7r	b0ac676c-e17b-4857-9de4-f67f655572b8	t	2025-08-02 22:04:12.181005+00	2025-08-02 23:02:17.928378+00	\N	ed1e137f-e530-43ab-a302-fe607fa6e21d
00000000-0000-0000-0000-000000000000	34	gwrvqmx6iclx	b0ac676c-e17b-4857-9de4-f67f655572b8	t	2025-08-02 23:02:17.945146+00	2025-08-03 00:00:59.964018+00	mrdf3tr7ge7r	ed1e137f-e530-43ab-a302-fe607fa6e21d
00000000-0000-0000-0000-000000000000	35	ajozup6nfih2	b0ac676c-e17b-4857-9de4-f67f655572b8	t	2025-08-03 00:00:59.972296+00	2025-08-03 01:18:06.069216+00	gwrvqmx6iclx	ed1e137f-e530-43ab-a302-fe607fa6e21d
00000000-0000-0000-0000-000000000000	36	zedwznyylu3x	b0ac676c-e17b-4857-9de4-f67f655572b8	f	2025-08-03 01:18:06.093484+00	2025-08-03 01:18:06.093484+00	ajozup6nfih2	ed1e137f-e530-43ab-a302-fe607fa6e21d
00000000-0000-0000-0000-000000000000	37	gv6lg44sqkgz	b0ac676c-e17b-4857-9de4-f67f655572b8	f	2025-08-03 01:39:10.702505+00	2025-08-03 01:39:10.702505+00	\N	be7e3ce6-9d93-47dc-b651-6dc4c700a2d7
00000000-0000-0000-0000-000000000000	49	4ksl4uyurijo	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 09:38:50.353456+00	2025-08-04 09:38:50.353456+00	\N	424f5029-8e7c-4799-8bbd-c46263ea2516
00000000-0000-0000-0000-000000000000	50	lheym72lnli7	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 09:40:58.610064+00	2025-08-04 09:40:58.610064+00	\N	beee20eb-be68-4a78-b109-e606145a8ac3
00000000-0000-0000-0000-000000000000	52	vybvucapvns5	f398ef4e-d95a-4354-8851-edc9ba629580	f	2025-08-04 09:45:38.466116+00	2025-08-04 09:45:38.466116+00	\N	a129d51b-4a04-4538-bc1a-b722f46f8289
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
1f896390-b796-443f-b01b-d11f589c2322	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 22:56:20.23678+00	2025-08-05 08:13:54.550033+00	\N	aal1	\N	2025-08-05 08:13:54.548672	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
749d3512-d329-448f-91ac-fd5bad771440	b0ac676c-e17b-4857-9de4-f67f655572b8	2025-08-02 21:51:01.872839+00	2025-08-02 21:51:01.872839+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
ed1e137f-e530-43ab-a302-fe607fa6e21d	b0ac676c-e17b-4857-9de4-f67f655572b8	2025-08-02 22:04:12.178012+00	2025-08-03 01:18:06.118685+00	\N	aal1	\N	2025-08-03 01:18:06.118601	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
be7e3ce6-9d93-47dc-b651-6dc4c700a2d7	b0ac676c-e17b-4857-9de4-f67f655572b8	2025-08-03 01:39:10.689256+00	2025-08-03 01:39:10.689256+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
424f5029-8e7c-4799-8bbd-c46263ea2516	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 09:38:50.328034+00	2025-08-04 09:38:50.328034+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
beee20eb-be68-4a78-b109-e606145a8ac3	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 09:40:58.608773+00	2025-08-04 09:40:58.608773+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
a129d51b-4a04-4538-bc1a-b722f46f8289	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 09:45:38.46443+00	2025-08-04 09:45:38.46443+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
2a097980-1dda-4125-8aa7-215bea4a3d30	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:04:03.75593+00	2025-08-04 10:04:03.75593+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
416d1c52-a09d-4d2b-a763-40e842112293	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:11:52.170431+00	2025-08-04 10:11:52.170431+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
4aab8d6c-e5c8-4013-8e94-969d0c76c96a	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:15:19.947536+00	2025-08-04 10:15:19.947536+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
ed55b093-23cd-4b11-afc9-0d9e574dcad9	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:25:52.474742+00	2025-08-04 10:25:52.474742+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
4ed19a20-d8c1-4774-bbbe-5d85c75e9659	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:29:31.668882+00	2025-08-04 10:29:31.668882+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
97ddea04-a088-4f66-9a7b-4b7b5d0189d6	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 11:07:12.048214+00	2025-08-04 11:07:12.048214+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
87dab571-d079-4d28-8463-710e12a395e1	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:51:25.361289+00	2025-08-04 22:20:03.409579+00	\N	aal1	\N	2025-08-04 22:20:03.408883	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15	94.20.42.121	\N
272fec4c-1e37-4c28-90d1-a01c45f5f16d	f398ef4e-d95a-4354-8851-edc9ba629580	2025-08-04 10:34:21.395448+00	2025-08-04 22:46:25.690492+00	\N	aal1	\N	2025-08-04 22:46:25.690408	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	94.20.42.121	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	fb859511-c1d8-478a-9265-8be60a1fea5f	authenticated	authenticated	musab.tural.osmanli@gmail.com	$2a$10$6OMgzcZ8k7ypxtxFoXbamOxgWqNr0m1sbGazCLq8NBwFdxOv3V7yC	\N	\N	7386fb6c76e4e902c4c139b8c7defce3bb58b5c9c8b70b5af498bc65	2025-08-02 17:08:43.912524+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "fb859511-c1d8-478a-9265-8be60a1fea5f", "email": "musab.tural.osmanli@gmail.com", "email_verified": false, "phone_verified": false}	\N	2025-08-02 17:08:43.898239+00	2025-08-02 17:08:44.707464+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b0ac676c-e17b-4857-9de4-f67f655572b8	authenticated	authenticated	mr.turfaldino@gmail.com	$2a$10$.u8na2JiH.trXAJM57NKiOaKJLfAEc1CjK2w0./CP0DWB.FH1qQ4G	2025-08-02 21:49:10.867249+00	\N		\N		\N			\N	2025-08-03 01:39:10.689158+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-08-02 21:49:10.849385+00	2025-08-03 01:39:10.726396+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	db6de2e5-6881-4060-9118-be991fb525b9	authenticated	authenticated	turan.musab.osman@icloud.com	$2a$10$f9HCNAOV486KR.NiPqu.1O3eYdHEt0gGmDbcp/T4v/N.83oWUIXF6	2025-08-02 18:38:36.755342+00	\N		\N		\N			\N	2025-08-04 09:44:55.386078+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2025-08-02 18:38:36.720686+00	2025-08-04 09:44:55.392623+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	f398ef4e-d95a-4354-8851-edc9ba629580	authenticated	authenticated	tural_mamedov@hotmail.com	$2a$10$4Im3qW1hfLFh.w5XswiPuOtCZmvDJZgJFeOuKd29zdOaXQDBQ4nMC	2025-08-02 15:24:26.075927+00	\N		\N		\N			\N	2025-08-04 22:56:20.236613+00	{"provider": "email", "providers": ["email"]}	{"sub": "f398ef4e-d95a-4354-8851-edc9ba629580", "email": "tural_mamedov@hotmail.com", "email_verified": true, "phone_verified": false}	\N	2025-08-02 15:23:25.744356+00	2025-08-05 08:13:54.537686+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	297f934c-8d73-48d0-9d2a-5c5d51d244d6	authenticated	authenticated	tural.musab.osmanli@gmail.com	$2a$10$EaXANoy7/K8guMqPzeHPH.ycqOwKxM8dtvqpnuc0gXJhthB58kAvK	2025-08-02 17:21:27.134421+00	\N		\N	5fbed5eeb022f2bb1f2bdebe2bbe804ee2920df4e9988029a071f8cb	2025-08-02 20:16:55.345342+00			\N	2025-08-03 01:42:01.757781+00	{"provider": "email", "providers": ["email"]}	{"sub": "297f934c-8d73-48d0-9d2a-5c5d51d244d6", "email": "tural.musab.osmanli@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-08-02 17:21:04.016362+00	2025-08-03 01:42:01.783187+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: analytics_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analytics_events (id, user_id, event_type, event_data, session_id, created_at) FROM stdin;
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, title, subject, grade, topic, content_type, content_data, created_at, creator_id) FROM stdin;
bd8acdf9-2c82-4584-b5e5-9c2b077977f5	Natural ədədlər	math	5	Natural ədədlər	lesson	{"sections": [], "description": "Saymaq üçün istifadə olaunan ədədlərə natural ədədlər deyilir."}	2025-08-02 22:16:19.946605	\N
eec4159e-4e95-477a-958c-4e53b7c1987e	Natural ədədlər	math	5	Natural ədədlər üzərində əməllər	quiz	{"questions": [{"id": "1754174431333", "type": "multiple_choice", "points": 10, "correct": 3, "options": ["3n + 2", "n^2 + n", "n^2 + 5", "4n + 3"], "question": "Aşağıdakılardan hansının n-in bütün natural qiymətlərində təkdir?", "explanation": "İfadələrin qiymətinin tək və ya cüt olduğunu tapmaq üçün ifadənin qiymətini dəyişənin həm tək (1), həm də cüt (2) qiyməti üçün hesablamaq lazımdır.  \\nA) 3n + 2    n = 1 olduqda: 3 \\\\cdot 1 + 2 = 5 (tək)\\n                   n = 2 olduqda: 3 \\\\cdot 2 + 2 = 8 (cütdür)  \\nB) n^2 + n   n = 1 olduqda: 1^2 + 1 = 2 (cütdür)\\n                   n = 2 olduqda: 2^2 + 2 = 6 (cütdür)\\n C) n^2 + 5   n = 1 olduqda: 1^2 + 5 = 6 (cütdür)\\n                  n = 2 olduqda: 2^2 + 5 = 9 (təkdir)  \\nD) 4n + 3    n = 1 olduqda: 4 \\\\cdot 1 + 3 = 7 (təkdir)\\n                  n = 2 olduqda: 4 \\\\cdot 2 + 3 = 11 (təkdir)  \\n\\nCavab: D) 4n + 3", "correct_answer": 3}], "time_limit": 15, "description": "Tək ədədin natural üstlü qüvvəti tək, cüt ədədin natural üstlü qüvvəti isə cütdür.\\nT · T = T; C · C = C", "instructions": "Her sorunun tek doğru cevabı vardır.", "passing_score": 60}	2025-08-02 22:48:55.627045	\N
\.


--
-- Data for Name: daily_leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daily_leaderboard (id, user_id, username, avatar_url, daily_points, rank, date, created_at) FROM stdin;
\.


--
-- Data for Name: parent_student_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parent_student_links (id, parent_id, student_id, status, invited_at, confirmed_at, invited_email) FROM stdin;
\.


--
-- Data for Name: point_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.point_history (id, user_id, points, reason, quiz_id, metadata, created_at) FROM stdin;
b869e7a2-92c4-453a-adfa-1bda84a27c3d	f398ef4e-d95a-4354-8851-edc9ba629580	850	quiz_completion	eec4159e-4e95-477a-958c-4e53b7c1987e	\N	2025-08-04 21:18:51.816818+00
a76825e9-a61e-463f-a8aa-d620b3891609	f398ef4e-d95a-4354-8851-edc9ba629580	850	quiz_completion	eec4159e-4e95-477a-958c-4e53b7c1987e	\N	2025-08-05 08:26:09.897436+00
\.


--
-- Data for Name: quiz_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_assignments (id, created_at, quiz_id, assigned_to_user_id, assigned_to_grade, assigned_by) FROM stdin;
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_attempts (id, student_id, quiz_id, score, answers, time_spent, completed_at) FROM stdin;
db85046f-9e92-4789-89dc-3cde29d4fdb8	f398ef4e-d95a-4354-8851-edc9ba629580	eec4159e-4e95-477a-958c-4e53b7c1987e	85.00	\N	\N	2025-08-04 20:55:37.816931
\.


--
-- Data for Name: teacher_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher_applications (id, email, full_name, phone, subjects, experience, status, applied_at, reviewed_at, reviewed_by) FROM stdin;
\.


--
-- Data for Name: teacher_student_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher_student_links (id, created_at, teacher_id, student_id, status) FROM stdin;
\.


--
-- Data for Name: user_badges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_badges (id, user_id, badge_id, badge_name, badge_description, badge_icon, badge_category, badge_rarity, points_reward, awarded_at) FROM stdin;
f0ff167a-58f3-4405-a39e-a3a9d39b35a2	\N	first_quiz	İlk Adım	İlk quizini tamamladın!	🎯	achievement	common	50	2025-08-03 21:51:21.970744+00
229628cc-8a40-4d59-bb2a-cd158f977364	\N	streak_7	Haftalık Tutarlı	7 gün üst üste aktif oldun!	🔥	streak	rare	100	2025-08-03 21:51:21.970744+00
bb9768f4-01cd-4236-9fbe-c9d755349a26	\N	perfect_score	Mükemmeliyetçi	Bir quizde %100 başarı elde ettin!	⭐	quiz	epic	200	2025-08-03 21:51:21.970744+00
f4540358-e684-4c89-9bc6-6785ec14cd47	\N	speed_demon	Hız Şeytanı	Bir quizi 1 dakika içinde tamamladın!	⚡	quiz	rare	150	2025-08-03 21:51:21.970744+00
bc9f98cf-5d41-488d-94d8-53b778b19dc6	\N	quiz_master_10	Quiz Ustası	10 quiz tamamladın!	🏆	achievement	rare	100	2025-08-03 21:51:21.970744+00
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profiles (id, user_id, total_xp, level, avatar, display_name, bio, created_at, updated_at, full_name, email, role, grade) FROM stdin;
d11b2776-ec01-45bf-bb79-9325d1f55686	f398ef4e-d95a-4354-8851-edc9ba629580	0	1	\N	\N	\N	2025-08-04 11:55:13.657241+00	2025-08-04 11:55:13.657241+00	Tural Mammadov	tural_mamedov@hotmail.com	student	\N
8b0571f2-9fe4-4bd5-bfa9-ef0bffa377a5	b0ac676c-e17b-4857-9de4-f67f655572b8	0	1	\N	\N	\N	2025-08-04 11:55:29.58792+00	2025-08-04 11:55:29.58792+00	Nuray Maryam	mr.turfaldino@gmail.com	teacher	\N
31084e90-0b56-4cc4-b894-60a0d1ae645c	fb859511-c1d8-478a-9265-8be60a1fea5f	0	1	\N	\N	\N	2025-08-04 11:55:43.484687+00	2025-08-04 11:55:43.484687+00	test	musab.tural.osmanli@gmail.com	parent	\N
a12a66c0-8ad9-468c-8252-5dbbf0f243d5	297f934c-8d73-48d0-9d2a-5c5d51d244d6	0	1	\N	\N	\N	2025-08-04 11:55:43.484687+00	2025-08-04 11:55:43.484687+00	test	tural.musab.osmanli@gmail.com	parent	\N
f572ee95-9e32-4898-a855-6964374c907d	db6de2e5-6881-4060-9118-be991fb525b9	0	1	\N	\N	\N	2025-08-04 11:56:14.41836+00	2025-08-04 11:56:14.41836+00	turan.musab.osman@icloud.com	Super Admin	superadmin	\N
\.


--
-- Data for Name: user_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_stats (id, user_id, total_quizzes_completed, total_correct_answers, total_incorrect_answers, average_accuracy, total_time_spent, total_points_earned, favorite_subject, last_activity, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_streaks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_streaks (id, user_id, current_streak, longest_streak, last_activity_date, streak_type, updated_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-08-02 13:02:43
20211116045059	2025-08-02 13:02:45
20211116050929	2025-08-02 13:02:47
20211116051442	2025-08-02 13:02:48
20211116212300	2025-08-02 13:02:50
20211116213355	2025-08-02 13:02:52
20211116213934	2025-08-02 13:02:53
20211116214523	2025-08-02 13:02:56
20211122062447	2025-08-02 13:02:57
20211124070109	2025-08-02 13:02:59
20211202204204	2025-08-02 13:03:00
20211202204605	2025-08-02 13:03:02
20211210212804	2025-08-02 13:03:07
20211228014915	2025-08-02 13:03:09
20220107221237	2025-08-02 13:03:10
20220228202821	2025-08-02 13:03:12
20220312004840	2025-08-02 13:03:14
20220603231003	2025-08-02 13:03:16
20220603232444	2025-08-02 13:03:18
20220615214548	2025-08-02 13:03:20
20220712093339	2025-08-02 13:03:21
20220908172859	2025-08-02 13:03:23
20220916233421	2025-08-02 13:03:24
20230119133233	2025-08-02 13:03:26
20230128025114	2025-08-02 13:03:28
20230128025212	2025-08-02 13:03:30
20230227211149	2025-08-02 13:03:31
20230228184745	2025-08-02 13:03:33
20230308225145	2025-08-02 13:03:35
20230328144023	2025-08-02 13:03:36
20231018144023	2025-08-02 13:03:38
20231204144023	2025-08-02 13:03:41
20231204144024	2025-08-02 13:03:42
20231204144025	2025-08-02 13:03:44
20240108234812	2025-08-02 13:03:45
20240109165339	2025-08-02 13:03:47
20240227174441	2025-08-02 13:03:50
20240311171622	2025-08-02 13:03:52
20240321100241	2025-08-02 13:03:56
20240401105812	2025-08-02 13:04:00
20240418121054	2025-08-02 13:04:02
20240523004032	2025-08-02 13:04:08
20240618124746	2025-08-02 13:04:10
20240801235015	2025-08-02 13:04:11
20240805133720	2025-08-02 13:04:13
20240827160934	2025-08-02 13:04:14
20240919163303	2025-08-02 13:04:17
20240919163305	2025-08-02 13:04:18
20241019105805	2025-08-02 13:04:20
20241030150047	2025-08-02 13:04:26
20241108114728	2025-08-02 13:04:28
20241121104152	2025-08-02 13:04:30
20241130184212	2025-08-02 13:04:32
20241220035512	2025-08-02 13:04:33
20241220123912	2025-08-02 13:04:35
20241224161212	2025-08-02 13:04:37
20250107150512	2025-08-02 13:04:38
20250110162412	2025-08-02 13:04:40
20250123174212	2025-08-02 13:04:41
20250128220012	2025-08-02 13:04:43
20250506224012	2025-08-02 13:04:44
20250523164012	2025-08-02 13:04:46
20250714121412	2025-08-02 13:04:47
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-08-02 13:02:40.19285
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-08-02 13:02:40.204793
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-08-02 13:02:40.214808
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-08-02 13:02:40.249849
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-08-02 13:02:40.271737
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-08-02 13:02:40.279052
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-08-02 13:02:40.292239
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-08-02 13:02:40.298494
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-08-02 13:02:40.307709
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-08-02 13:02:40.316602
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-08-02 13:02:40.322855
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-08-02 13:02:40.329707
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-08-02 13:02:40.341734
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-08-02 13:02:40.351945
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-08-02 13:02:40.36238
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-08-02 13:02:40.393091
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-08-02 13:02:40.402608
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-08-02 13:02:40.409939
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-08-02 13:02:40.417074
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-08-02 13:02:40.426167
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-08-02 13:02:40.434286
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-08-02 13:02:40.445375
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-08-02 13:02:40.462781
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-08-02 13:02:40.477522
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-08-02 13:02:40.486222
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-08-02 13:02:40.497028
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250805000000	{"SET statement_timeout = 0","SET lock_timeout = 0","SET idle_in_transaction_session_timeout = 0","SET client_encoding = 'UTF8'","SET standard_conforming_strings = on","SELECT pg_catalog.set_config('search_path', '', false)","SET check_function_bodies = false","SET xmloption = content","SET client_min_messages = warning","SET row_security = off","COMMENT ON SCHEMA \\"public\\" IS 'standard public schema'","CREATE EXTENSION IF NOT EXISTS \\"pg_graphql\\" WITH SCHEMA \\"graphql\\"","CREATE EXTENSION IF NOT EXISTS \\"pg_stat_statements\\" WITH SCHEMA \\"extensions\\"","CREATE EXTENSION IF NOT EXISTS \\"pgcrypto\\" WITH SCHEMA \\"extensions\\"","CREATE EXTENSION IF NOT EXISTS \\"supabase_vault\\" WITH SCHEMA \\"vault\\"","CREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\" WITH SCHEMA \\"extensions\\"","CREATE TYPE \\"public\\".\\"user_role\\" AS ENUM (\n    'superadmin',\n    'admin',\n    'teacher',\n    'student',\n    'parent'\n)","ALTER TYPE \\"public\\".\\"user_role\\" OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"calculate_level\\"(\\"xp\\" integer) RETURNS integer\n    LANGUAGE \\"plpgsql\\"\n    AS $$\nDECLARE\n  level INTEGER := 1;\n  required_xp INTEGER := 0;\nBEGIN\n  WHILE xp >= required_xp LOOP\n    level := level + 1;\n    required_xp := required_xp + (level * 100);\n  END LOOP;\n  RETURN level - 1;\nEND;\n$$","ALTER FUNCTION \\"public\\".\\"calculate_level\\"(\\"xp\\" integer) OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"create_user_profile\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\nDECLARE\n  user_role TEXT := 'student'; -- default role\n  user_full_name TEXT;\n  user_grade INTEGER;\nBEGIN\n  -- Extract data from auth.users.raw_user_meta_data (options.data)\n  IF NEW.raw_user_meta_data IS NOT NULL THEN\n    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');\n    user_full_name := NEW.raw_user_meta_data->>'full_name';\n    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;\n  END IF;\n\n  INSERT INTO user_profiles (\n    user_id, \n    total_xp, \n    level, \n    role, \n    full_name, \n    email, \n    grade\n  )\n  VALUES (\n    NEW.id, \n    0, \n    1, \n    user_role, \n    user_full_name, \n    NEW.email, \n    user_grade\n  )\n  ON CONFLICT (user_id) DO UPDATE SET\n    role = EXCLUDED.role,\n    full_name = EXCLUDED.full_name,\n    email = EXCLUDED.email,\n    grade = EXCLUDED.grade,\n    updated_at = NOW();\n  \n  RETURN NEW;\nEND;\n$$","ALTER FUNCTION \\"public\\".\\"create_user_profile\\"() OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"create_user_stats\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\nBEGIN\n  INSERT INTO user_stats (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n  \n  INSERT INTO user_streaks (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n  \n  RETURN NEW;\nEND;\n$$","ALTER FUNCTION \\"public\\".\\"create_user_stats\\"() OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"handle_new_user\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\" SECURITY DEFINER\n    SET \\"search_path\\" TO 'public'\n    AS $$\nbegin\n  insert into public.user_profiles (user_id, email, full_name, role)\n  values (\n    new.id,\n    new.email,\n    new.raw_user_meta_data->>'full_name',\n    'student' -- Varsayılan olarak her yeni kullanıcı öğrenci olur.\n  );\n  return new;\nend;\n$$","ALTER FUNCTION \\"public\\".\\"handle_new_user\\"() OWNER TO \\"postgres\\"","CREATE OR REPLACE FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"() RETURNS \\"trigger\\"\n    LANGUAGE \\"plpgsql\\"\n    AS $$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$$","ALTER FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"() OWNER TO \\"postgres\\"","SET default_tablespace = ''","SET default_table_access_method = \\"heap\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"analytics_events\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"event_type\\" \\"text\\" NOT NULL,\n    \\"event_data\\" \\"jsonb\\",\n    \\"session_id\\" \\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"analytics_events\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"content\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"title\\" character varying(255) NOT NULL,\n    \\"subject\\" character varying(50) DEFAULT 'math'::character varying,\n    \\"grade\\" integer,\n    \\"topic\\" character varying(255),\n    \\"content_type\\" character varying(20),\n    \\"content_data\\" \\"jsonb\\" NOT NULL,\n    \\"created_at\\" timestamp without time zone DEFAULT \\"now\\"(),\n    \\"creator_id\\" \\"uuid\\",\n    CONSTRAINT \\"content_content_type_check\\" CHECK (((\\"content_type\\")::\\"text\\" = ANY ((ARRAY['lesson'::character varying, 'quiz'::character varying])::\\"text\\"[])))\n)","ALTER TABLE \\"public\\".\\"content\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"daily_leaderboard\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"username\\" \\"text\\" NOT NULL,\n    \\"avatar_url\\" \\"text\\",\n    \\"daily_points\\" integer DEFAULT 0,\n    \\"rank\\" integer,\n    \\"date\\" \\"date\\" DEFAULT CURRENT_DATE,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"daily_leaderboard\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"parent_student_links\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"parent_id\\" \\"uuid\\",\n    \\"student_id\\" \\"uuid\\",\n    \\"status\\" \\"text\\" DEFAULT 'pending'::\\"text\\",\n    \\"invited_at\\" timestamp without time zone DEFAULT \\"now\\"(),\n    \\"confirmed_at\\" timestamp without time zone,\n    \\"invited_email\\" \\"text\\"\n)","ALTER TABLE \\"public\\".\\"parent_student_links\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"point_history\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"points\\" integer NOT NULL,\n    \\"reason\\" \\"text\\" NOT NULL,\n    \\"quiz_id\\" \\"uuid\\",\n    \\"metadata\\" \\"jsonb\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    CONSTRAINT \\"point_history_reason_check\\" CHECK ((\\"reason\\" = ANY (ARRAY['quiz_completion'::\\"text\\", 'streak_bonus'::\\"text\\", 'achievement'::\\"text\\", 'daily_login'::\\"text\\", 'speed_bonus'::\\"text\\", 'perfect_score'::\\"text\\"])))\n)","ALTER TABLE \\"public\\".\\"point_history\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"quiz_assignments\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"() NOT NULL,\n    \\"quiz_id\\" \\"uuid\\" NOT NULL,\n    \\"assigned_to_user_id\\" \\"uuid\\",\n    \\"assigned_to_grade\\" integer,\n    \\"assigned_by\\" \\"uuid\\" NOT NULL\n)","ALTER TABLE \\"public\\".\\"quiz_assignments\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"quiz_attempts\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"student_id\\" \\"uuid\\",\n    \\"quiz_id\\" \\"uuid\\",\n    \\"score\\" numeric(5,2),\n    \\"answers\\" \\"jsonb\\",\n    \\"time_spent\\" integer,\n    \\"completed_at\\" timestamp without time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"quiz_attempts\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"teacher_applications\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"extensions\\".\\"uuid_generate_v4\\"() NOT NULL,\n    \\"email\\" character varying(255) NOT NULL,\n    \\"full_name\\" character varying(255) NOT NULL,\n    \\"phone\\" character varying(20),\n    \\"subjects\\" \\"text\\"[],\n    \\"experience\\" \\"text\\",\n    \\"status\\" character varying(20) DEFAULT 'pending'::character varying,\n    \\"applied_at\\" timestamp without time zone DEFAULT \\"now\\"(),\n    \\"reviewed_at\\" timestamp without time zone,\n    \\"reviewed_by\\" \\"uuid\\"\n)","ALTER TABLE \\"public\\".\\"teacher_applications\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"teacher_student_links\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"() NOT NULL,\n    \\"teacher_id\\" \\"uuid\\" NOT NULL,\n    \\"student_id\\" \\"uuid\\" NOT NULL,\n    \\"status\\" \\"text\\" DEFAULT 'pending'::\\"text\\" NOT NULL\n)","ALTER TABLE \\"public\\".\\"teacher_student_links\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"user_badges\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"badge_id\\" \\"text\\" NOT NULL,\n    \\"badge_name\\" \\"text\\" NOT NULL,\n    \\"badge_description\\" \\"text\\",\n    \\"badge_icon\\" \\"text\\",\n    \\"badge_category\\" \\"text\\",\n    \\"badge_rarity\\" \\"text\\",\n    \\"points_reward\\" integer DEFAULT 0,\n    \\"awarded_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    CONSTRAINT \\"user_badges_badge_category_check\\" CHECK ((\\"badge_category\\" = ANY (ARRAY['achievement'::\\"text\\", 'streak'::\\"text\\", 'quiz'::\\"text\\", 'social'::\\"text\\"]))),\n    CONSTRAINT \\"user_badges_badge_rarity_check\\" CHECK ((\\"badge_rarity\\" = ANY (ARRAY['common'::\\"text\\", 'rare'::\\"text\\", 'epic'::\\"text\\", 'legendary'::\\"text\\"])))\n)","ALTER TABLE \\"public\\".\\"user_badges\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"user_profiles\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"total_xp\\" integer DEFAULT 0,\n    \\"level\\" integer DEFAULT 1,\n    \\"avatar\\" \\"text\\",\n    \\"display_name\\" \\"text\\",\n    \\"bio\\" \\"text\\",\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"full_name\\" \\"text\\",\n    \\"email\\" \\"text\\",\n    \\"role\\" \\"public\\".\\"user_role\\" DEFAULT 'student'::\\"public\\".\\"user_role\\" NOT NULL,\n    \\"grade\\" integer\n)","ALTER TABLE \\"public\\".\\"user_profiles\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"user_stats\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"total_quizzes_completed\\" integer DEFAULT 0,\n    \\"total_correct_answers\\" integer DEFAULT 0,\n    \\"total_incorrect_answers\\" integer DEFAULT 0,\n    \\"average_accuracy\\" numeric(5,2) DEFAULT 0,\n    \\"total_time_spent\\" integer DEFAULT 0,\n    \\"total_points_earned\\" integer DEFAULT 0,\n    \\"favorite_subject\\" \\"text\\",\n    \\"last_activity\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"created_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"()\n)","ALTER TABLE \\"public\\".\\"user_stats\\" OWNER TO \\"postgres\\"","CREATE TABLE IF NOT EXISTS \\"public\\".\\"user_streaks\\" (\n    \\"id\\" \\"uuid\\" DEFAULT \\"gen_random_uuid\\"() NOT NULL,\n    \\"user_id\\" \\"uuid\\",\n    \\"current_streak\\" integer DEFAULT 0,\n    \\"longest_streak\\" integer DEFAULT 0,\n    \\"last_activity_date\\" \\"date\\" DEFAULT CURRENT_DATE,\n    \\"streak_type\\" \\"text\\" DEFAULT 'daily'::\\"text\\",\n    \\"updated_at\\" timestamp with time zone DEFAULT \\"now\\"(),\n    CONSTRAINT \\"user_streaks_streak_type_check\\" CHECK ((\\"streak_type\\" = ANY (ARRAY['daily'::\\"text\\", 'weekly'::\\"text\\", 'quiz'::\\"text\\"])))\n)","ALTER TABLE \\"public\\".\\"user_streaks\\" OWNER TO \\"postgres\\"","ALTER TABLE ONLY \\"public\\".\\"analytics_events\\"\n    ADD CONSTRAINT \\"analytics_events_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"content\\"\n    ADD CONSTRAINT \\"content_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"daily_leaderboard\\"\n    ADD CONSTRAINT \\"daily_leaderboard_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"daily_leaderboard\\"\n    ADD CONSTRAINT \\"daily_leaderboard_user_id_date_key\\" UNIQUE (\\"user_id\\", \\"date\\")","ALTER TABLE ONLY \\"public\\".\\"parent_student_links\\"\n    ADD CONSTRAINT \\"parent_student_links_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"point_history\\"\n    ADD CONSTRAINT \\"point_history_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"quiz_assignments\\"\n    ADD CONSTRAINT \\"quiz_assignments_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"quiz_attempts\\"\n    ADD CONSTRAINT \\"quiz_attempts_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"teacher_applications\\"\n    ADD CONSTRAINT \\"teacher_applications_email_key\\" UNIQUE (\\"email\\")","ALTER TABLE ONLY \\"public\\".\\"teacher_applications\\"\n    ADD CONSTRAINT \\"teacher_applications_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"teacher_student_links\\"\n    ADD CONSTRAINT \\"teacher_student_links_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"parent_student_links\\"\n    ADD CONSTRAINT \\"unique_parent_student\\" UNIQUE (\\"parent_id\\", \\"student_id\\")","ALTER TABLE ONLY \\"public\\".\\"user_badges\\"\n    ADD CONSTRAINT \\"user_badges_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"user_badges\\"\n    ADD CONSTRAINT \\"user_badges_user_id_badge_id_key\\" UNIQUE (\\"user_id\\", \\"badge_id\\")","ALTER TABLE ONLY \\"public\\".\\"user_profiles\\"\n    ADD CONSTRAINT \\"user_profiles_email_key\\" UNIQUE (\\"email\\")","ALTER TABLE ONLY \\"public\\".\\"user_profiles\\"\n    ADD CONSTRAINT \\"user_profiles_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"user_profiles\\"\n    ADD CONSTRAINT \\"user_profiles_user_id_key\\" UNIQUE (\\"user_id\\")","ALTER TABLE ONLY \\"public\\".\\"user_stats\\"\n    ADD CONSTRAINT \\"user_stats_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"user_stats\\"\n    ADD CONSTRAINT \\"user_stats_user_id_key\\" UNIQUE (\\"user_id\\")","ALTER TABLE ONLY \\"public\\".\\"user_streaks\\"\n    ADD CONSTRAINT \\"user_streaks_pkey\\" PRIMARY KEY (\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"user_streaks\\"\n    ADD CONSTRAINT \\"user_streaks_user_id_key\\" UNIQUE (\\"user_id\\")","CREATE INDEX \\"idx_analytics_events_created_at\\" ON \\"public\\".\\"analytics_events\\" USING \\"btree\\" (\\"created_at\\")","CREATE INDEX \\"idx_analytics_events_user_id\\" ON \\"public\\".\\"analytics_events\\" USING \\"btree\\" (\\"user_id\\")","CREATE INDEX \\"idx_content_creator_id\\" ON \\"public\\".\\"content\\" USING \\"btree\\" (\\"creator_id\\")","CREATE INDEX \\"idx_daily_leaderboard_date\\" ON \\"public\\".\\"daily_leaderboard\\" USING \\"btree\\" (\\"date\\")","CREATE INDEX \\"idx_point_history_created_at\\" ON \\"public\\".\\"point_history\\" USING \\"btree\\" (\\"created_at\\")","CREATE INDEX \\"idx_point_history_user_id\\" ON \\"public\\".\\"point_history\\" USING \\"btree\\" (\\"user_id\\")","CREATE INDEX \\"idx_quiz_attempts_completed_at\\" ON \\"public\\".\\"quiz_attempts\\" USING \\"btree\\" (\\"completed_at\\")","CREATE INDEX \\"idx_quiz_attempts_quiz_id\\" ON \\"public\\".\\"quiz_attempts\\" USING \\"btree\\" (\\"quiz_id\\")","CREATE INDEX \\"idx_quiz_attempts_student_id\\" ON \\"public\\".\\"quiz_attempts\\" USING \\"btree\\" (\\"student_id\\")","CREATE INDEX \\"idx_user_badges_user_id\\" ON \\"public\\".\\"user_badges\\" USING \\"btree\\" (\\"user_id\\")","CREATE INDEX \\"idx_user_profiles_email\\" ON \\"public\\".\\"user_profiles\\" USING \\"btree\\" (\\"email\\")","CREATE INDEX \\"idx_user_profiles_level\\" ON \\"public\\".\\"user_profiles\\" USING \\"btree\\" (\\"level\\")","CREATE INDEX \\"idx_user_profiles_role\\" ON \\"public\\".\\"user_profiles\\" USING \\"btree\\" (\\"role\\")","CREATE INDEX \\"idx_user_profiles_total_xp\\" ON \\"public\\".\\"user_profiles\\" USING \\"btree\\" (\\"total_xp\\")","CREATE INDEX \\"idx_user_profiles_user_id\\" ON \\"public\\".\\"user_profiles\\" USING \\"btree\\" (\\"user_id\\")","CREATE INDEX \\"idx_user_stats_user_id\\" ON \\"public\\".\\"user_stats\\" USING \\"btree\\" (\\"user_id\\")","CREATE OR REPLACE TRIGGER \\"update_user_profile_timestamp_trigger\\" BEFORE UPDATE ON \\"public\\".\\"user_profiles\\" FOR EACH ROW EXECUTE FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"()","ALTER TABLE ONLY \\"public\\".\\"analytics_events\\"\n    ADD CONSTRAINT \\"analytics_events_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"content\\"\n    ADD CONSTRAINT \\"content_creator_id_fkey\\" FOREIGN KEY (\\"creator_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE SET NULL","ALTER TABLE ONLY \\"public\\".\\"daily_leaderboard\\"\n    ADD CONSTRAINT \\"daily_leaderboard_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"parent_student_links\\"\n    ADD CONSTRAINT \\"parent_student_links_parent_id_fkey\\" FOREIGN KEY (\\"parent_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"parent_student_links\\"\n    ADD CONSTRAINT \\"parent_student_links_student_id_fkey\\" FOREIGN KEY (\\"student_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"point_history\\"\n    ADD CONSTRAINT \\"point_history_quiz_id_fkey\\" FOREIGN KEY (\\"quiz_id\\") REFERENCES \\"public\\".\\"content\\"(\\"id\\") ON DELETE SET NULL","ALTER TABLE ONLY \\"public\\".\\"point_history\\"\n    ADD CONSTRAINT \\"point_history_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"quiz_assignments\\"\n    ADD CONSTRAINT \\"quiz_assignments_assigned_by_fkey\\" FOREIGN KEY (\\"assigned_by\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"quiz_assignments\\"\n    ADD CONSTRAINT \\"quiz_assignments_assigned_to_user_id_fkey\\" FOREIGN KEY (\\"assigned_to_user_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"quiz_assignments\\"\n    ADD CONSTRAINT \\"quiz_assignments_quiz_id_fkey\\" FOREIGN KEY (\\"quiz_id\\") REFERENCES \\"public\\".\\"content\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"quiz_attempts\\"\n    ADD CONSTRAINT \\"quiz_attempts_quiz_id_fkey\\" FOREIGN KEY (\\"quiz_id\\") REFERENCES \\"public\\".\\"content\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"quiz_attempts\\"\n    ADD CONSTRAINT \\"quiz_attempts_student_id_fkey\\" FOREIGN KEY (\\"student_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"teacher_applications\\"\n    ADD CONSTRAINT \\"teacher_applications_reviewed_by_fkey\\" FOREIGN KEY (\\"reviewed_by\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\")","ALTER TABLE ONLY \\"public\\".\\"teacher_student_links\\"\n    ADD CONSTRAINT \\"teacher_student_links_student_id_fkey\\" FOREIGN KEY (\\"student_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"teacher_student_links\\"\n    ADD CONSTRAINT \\"teacher_student_links_teacher_id_fkey\\" FOREIGN KEY (\\"teacher_id\\") REFERENCES \\"public\\".\\"user_profiles\\"(\\"user_id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"user_badges\\"\n    ADD CONSTRAINT \\"user_badges_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"user_profiles\\"\n    ADD CONSTRAINT \\"user_profiles_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"user_stats\\"\n    ADD CONSTRAINT \\"user_stats_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","ALTER TABLE ONLY \\"public\\".\\"user_streaks\\"\n    ADD CONSTRAINT \\"user_streaks_user_id_fkey\\" FOREIGN KEY (\\"user_id\\") REFERENCES \\"auth\\".\\"users\\"(\\"id\\") ON DELETE CASCADE","CREATE POLICY \\"Adminler öğretmen başvurularını görebilir\\" ON \\"public\\".\\"teacher_applications\\" FOR SELECT TO \\"authenticated\\" USING ((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['superadmin'::\\"public\\".\\"user_role\\", 'admin'::\\"public\\".\\"user_role\\"])))","CREATE POLICY \\"Adminler öğretmen başvurularını güncelleyebilir\\" ON \\"public\\".\\"teacher_applications\\" FOR UPDATE TO \\"authenticated\\" USING ((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['superadmin'::\\"public\\".\\"user_role\\", 'admin'::\\"public\\".\\"user_role\\"]))) WITH CHECK ((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['superadmin'::\\"public\\".\\"user_role\\", 'admin'::\\"public\\".\\"user_role\\"])))","CREATE POLICY \\"Client-side eklemeler engellendi\\" ON \\"public\\".\\"analytics_events\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (false)","CREATE POLICY \\"Client-side eklemeler engellendi\\" ON \\"public\\".\\"daily_leaderboard\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (false)","CREATE POLICY \\"Client-side eklemeler engellendi\\" ON \\"public\\".\\"point_history\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (false)","CREATE POLICY \\"Client-side eklemeler engellendi\\" ON \\"public\\".\\"user_badges\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (false)","CREATE POLICY \\"Herkes liderlik tablosunu görebilir\\" ON \\"public\\".\\"daily_leaderboard\\" FOR SELECT USING (true)","CREATE POLICY \\"Herkes öğretmenlik başvurusu yapabilir\\" ON \\"public\\".\\"teacher_applications\\" FOR INSERT WITH CHECK (true)","CREATE POLICY \\"Kullanıcılar ilgili quizleri görebilir\\" ON \\"public\\".\\"content\\" FOR SELECT TO \\"authenticated\\" USING (((\\"creator_id\\" = \\"auth\\".\\"uid\\"()) OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'superadmin'::\\"public\\".\\"user_role\\") OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"quiz_assignments\\"\n  WHERE ((\\"quiz_assignments\\".\\"quiz_id\\" = \\"content\\".\\"id\\") AND ((\\"quiz_assignments\\".\\"assigned_to_user_id\\" = \\"auth\\".\\"uid\\"()) OR (\\"quiz_assignments\\".\\"assigned_to_grade\\" = ( SELECT \\"content\\".\\"grade\\"\n           FROM \\"public\\".\\"user_profiles\\"\n          WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())))))))))","CREATE POLICY \\"Kullanıcılar kendi profilini güncelleyebilir\\" ON \\"public\\".\\"user_profiles\\" FOR UPDATE TO \\"authenticated\\" USING ((\\"auth\\".\\"uid\\"() = \\"user_id\\")) WITH CHECK ((\\"auth\\".\\"uid\\"() = \\"user_id\\"))","CREATE POLICY \\"Quiz'i sadece oluşturanlar veya Adminler güncelleyebilir\\" ON \\"public\\".\\"content\\" FOR UPDATE TO \\"authenticated\\" USING (((\\"creator_id\\" = \\"auth\\".\\"uid\\"()) OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'superadmin'::\\"public\\".\\"user_role\\"))) WITH CHECK (((\\"creator_id\\" = \\"auth\\".\\"uid\\"()) OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'superadmin'::\\"public\\".\\"user_role\\")))","CREATE POLICY \\"Rol bazlı profil görüntüleme kuralları\\" ON \\"public\\".\\"user_profiles\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles_1\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\" \\"user_profiles_1\\"\n  WHERE (\\"user_profiles_1\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (\\"role\\" = 'teacher'::\\"public\\".\\"user_role\\") OR ((( SELECT \\"user_profiles_1\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\" \\"user_profiles_1\\"\n  WHERE (\\"user_profiles_1\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'teacher'::\\"public\\".\\"user_role\\") AND (\\"role\\" = 'student'::\\"public\\".\\"user_role\\") AND (NOT (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE (\\"teacher_student_links\\".\\"student_id\\" = \\"user_profiles\\".\\"user_id\\")))))))","CREATE POLICY \\"System can manage stats\\" ON \\"public\\".\\"user_stats\\" USING (true)","CREATE POLICY \\"System can manage streaks\\" ON \\"public\\".\\"user_streaks\\" USING (true)","ALTER TABLE \\"public\\".\\"analytics_events\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"content\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"daily_leaderboard\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"parent_student_links\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"point_history\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"quiz_assignments\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"quiz_attempts\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"teacher_applications\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"teacher_student_links\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"user_badges\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"user_profiles\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"user_stats\\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \\"public\\".\\"user_streaks\\" ENABLE ROW LEVEL SECURITY","CREATE POLICY \\"Öğrenciler veli daveti oluşturabilir\\" ON \\"public\\".\\"parent_student_links\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'student'::\\"public\\".\\"user_role\\") AND (\\"auth\\".\\"uid\\"() = \\"student_id\\")))","CREATE POLICY \\"Öğrenciler yeni quiz denemesi ekleyebilir\\" ON \\"public\\".\\"quiz_attempts\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'student'::\\"public\\".\\"user_role\\") AND (\\"auth\\".\\"uid\\"() = \\"student_id\\")))","CREATE POLICY \\"Öğrenciler öğretmene başvurabilir\\" ON \\"public\\".\\"teacher_student_links\\" FOR INSERT TO \\"authenticated\\" WITH CHECK (((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'student'::\\"public\\".\\"user_role\\") AND (\\"auth\\".\\"uid\\"() = \\"student_id\\")))","CREATE POLICY \\"Öğretmenler başvuru durumunu güncelleyebilir\\" ON \\"public\\".\\"teacher_student_links\\" FOR UPDATE TO \\"authenticated\\" USING (((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'teacher'::\\"public\\".\\"user_role\\") AND (\\"auth\\".\\"uid\\"() = \\"teacher_id\\"))) WITH CHECK (((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = 'teacher'::\\"public\\".\\"user_role\\") AND (\\"auth\\".\\"uid\\"() = \\"teacher_id\\")))","CREATE POLICY \\"Öğretmenler ve Adminler quiz atayabilir\\" ON \\"public\\".\\"quiz_assignments\\" FOR INSERT TO \\"authenticated\\" WITH CHECK ((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['teacher'::\\"public\\".\\"user_role\\", 'admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])))","CREATE POLICY \\"Öğretmenler ve Adminler quiz oluşturabilir\\" ON \\"public\\".\\"content\\" FOR INSERT TO \\"authenticated\\" WITH CHECK ((( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['teacher'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])))","CREATE POLICY \\"İlgili taraflar ve Adminler analizleri görebilir\\" ON \\"public\\".\\"analytics_events\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"analytics_events\\".\\"user_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"analytics_events\\".\\"user_id\\"))))))","CREATE POLICY \\"İlgili taraflar ve Adminler atamaları görebilir\\" ON \\"public\\".\\"quiz_assignments\\" FOR SELECT TO \\"authenticated\\" USING (((\\"assigned_to_user_id\\" = \\"auth\\".\\"uid\\"()) OR (\\"assigned_by\\" = \\"auth\\".\\"uid\\"()) OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"]))))","CREATE POLICY \\"İlgili taraflar ve Adminler bağlantıyı görebilir\\" ON \\"public\\".\\"parent_student_links\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"parent_id\\") OR (\\"auth\\".\\"uid\\"() = \\"student_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"]))))","CREATE POLICY \\"İlgili taraflar ve Adminler bağlantıyı görebilir\\" ON \\"public\\".\\"teacher_student_links\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"teacher_id\\") OR (\\"auth\\".\\"uid\\"() = \\"student_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"]))))","CREATE POLICY \\"İlgili taraflar ve Adminler denemeleri görebilir\\" ON \\"public\\".\\"quiz_attempts\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"student_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"quiz_attempts\\".\\"student_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"quiz_attempts\\".\\"student_id\\"))))))","CREATE POLICY \\"İlgili taraflar ve Adminler istatistikleri görebilir\\" ON \\"public\\".\\"user_stats\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"user_stats\\".\\"user_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"user_stats\\".\\"user_id\\"))))))","CREATE POLICY \\"İlgili taraflar ve Adminler puanları görebilir\\" ON \\"public\\".\\"point_history\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"point_history\\".\\"user_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"point_history\\".\\"user_id\\"))))))","CREATE POLICY \\"İlgili taraflar ve Adminler rozetleri görebilir\\" ON \\"public\\".\\"user_badges\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"user_badges\\".\\"user_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"user_badges\\".\\"user_id\\"))))))","CREATE POLICY \\"İlgili taraflar ve Adminler serileri görebilir\\" ON \\"public\\".\\"user_streaks\\" FOR SELECT TO \\"authenticated\\" USING (((\\"auth\\".\\"uid\\"() = \\"user_id\\") OR (( SELECT \\"user_profiles\\".\\"role\\"\n   FROM \\"public\\".\\"user_profiles\\"\n  WHERE (\\"user_profiles\\".\\"user_id\\" = \\"auth\\".\\"uid\\"())) = ANY (ARRAY['admin'::\\"public\\".\\"user_role\\", 'superadmin'::\\"public\\".\\"user_role\\"])) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"parent_student_links\\"\n  WHERE ((\\"parent_student_links\\".\\"parent_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"parent_student_links\\".\\"student_id\\" = \\"user_streaks\\".\\"user_id\\")))) OR (EXISTS ( SELECT 1\n   FROM \\"public\\".\\"teacher_student_links\\"\n  WHERE ((\\"teacher_student_links\\".\\"teacher_id\\" = \\"auth\\".\\"uid\\"()) AND (\\"teacher_student_links\\".\\"student_id\\" = \\"user_streaks\\".\\"user_id\\"))))))","ALTER PUBLICATION \\"supabase_realtime\\" OWNER TO \\"postgres\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"postgres\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"anon\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"authenticated\\"","GRANT USAGE ON SCHEMA \\"public\\" TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"calculate_level\\"(\\"xp\\" integer) TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"calculate_level\\"(\\"xp\\" integer) TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"calculate_level\\"(\\"xp\\" integer) TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_profile\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_profile\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_profile\\"() TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_stats\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_stats\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"create_user_stats\\"() TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"handle_new_user\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"handle_new_user\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"handle_new_user\\"() TO \\"service_role\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"() TO \\"anon\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"() TO \\"authenticated\\"","GRANT ALL ON FUNCTION \\"public\\".\\"update_user_profile_timestamp\\"() TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"analytics_events\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"analytics_events\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"analytics_events\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"content\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"content\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"content\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"daily_leaderboard\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"daily_leaderboard\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"daily_leaderboard\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"parent_student_links\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"parent_student_links\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"parent_student_links\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"point_history\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"point_history\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"point_history\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_assignments\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_assignments\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_assignments\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_attempts\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_attempts\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"quiz_attempts\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_applications\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_applications\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_applications\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_student_links\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_student_links\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"teacher_student_links\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"user_badges\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"user_badges\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"user_badges\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"user_profiles\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"user_profiles\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"user_profiles\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"user_stats\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"user_stats\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"user_stats\\" TO \\"service_role\\"","GRANT ALL ON TABLE \\"public\\".\\"user_streaks\\" TO \\"anon\\"","GRANT ALL ON TABLE \\"public\\".\\"user_streaks\\" TO \\"authenticated\\"","GRANT ALL ON TABLE \\"public\\".\\"user_streaks\\" TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON SEQUENCES TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON FUNCTIONS TO \\"service_role\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"postgres\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"anon\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"authenticated\\"","ALTER DEFAULT PRIVILEGES FOR ROLE \\"postgres\\" IN SCHEMA \\"public\\" GRANT ALL ON TABLES TO \\"service_role\\"","RESET ALL"}	initial_schema
20250805103944	{"alter table \\"public\\".\\"content\\" drop constraint \\"content_content_type_check\\"","alter table \\"public\\".\\"content\\" add constraint \\"content_content_type_check\\" CHECK (((content_type)::text = ANY ((ARRAY['lesson'::character varying, 'quiz'::character varying])::text[]))) not valid","alter table \\"public\\".\\"content\\" validate constraint \\"content_content_type_check\\"","set check_function_bodies = off","CREATE OR REPLACE FUNCTION public.create_user_stats()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  INSERT INTO user_stats (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n  \n  INSERT INTO user_streaks (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n  \n  RETURN NEW;\nEND;\n$function$","CREATE OR REPLACE FUNCTION public.handle_new_user()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\nbegin\n  insert into public.user_profiles (user_id, email, full_name, role)\n  values (\n    new.id,\n    new.email,\n    new.raw_user_meta_data->>'full_name',\n    'student' -- Varsayılan olarak her yeni kullanıcı öğrenci olur.\n  );\n  return new;\nend;\n$function$","CREATE OR REPLACE FUNCTION public.create_user_profile()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  user_role TEXT := 'student'; -- default role\n  user_full_name TEXT;\n  user_grade INTEGER;\nBEGIN\n  -- Extract data from auth.users.raw_user_meta_data (options.data)\n  IF NEW.raw_user_meta_data IS NOT NULL THEN\n    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');\n    user_full_name := NEW.raw_user_meta_data->>'full_name';\n    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;\n  END IF;\n\n  INSERT INTO user_profiles (\n    user_id, \n    total_xp, \n    level, \n    role, \n    full_name, \n    email, \n    grade\n  )\n  VALUES (\n    NEW.id, \n    0, \n    1, \n    user_role, \n    user_full_name, \n    NEW.email, \n    user_grade\n  )\n  ON CONFLICT (user_id) DO UPDATE SET\n    role = EXCLUDED.role,\n    full_name = EXCLUDED.full_name,\n    email = EXCLUDED.email,\n    grade = EXCLUDED.grade,\n    updated_at = NOW();\n  \n  RETURN NEW;\nEND;\n$function$"}	remote_schema
20250805102518	{"-- Adım 1: Gereksiz ve eski trigger fonksiyonlarını veritabanından tamamen kaldır.\n-- `CASCADE` ifadesi, bu fonksiyonlara bağlı olan eski trigger'ları da otomatik olarak siler.\nDROP FUNCTION IF EXISTS public.handle_new_user() CASCADE","DROP FUNCTION IF EXISTS public.create_user_stats() CASCADE","-- Adım 2: Tüm mantığı birleştiren tek ve nihai fonksiyonu oluştur veya güncelle.\n-- Bu fonksiyon, hem profil (user_profiles) hem de istatistik (user_stats, user_streaks) tablolarına\n-- yeni kullanıcı için başlangıç kayıtlarını ekler.\nCREATE OR REPLACE FUNCTION public.create_user_profile()\nRETURNS TRIGGER AS $$\nDECLARE\n  user_role TEXT;\n  user_full_name TEXT;\n  user_grade INTEGER;\nBEGIN\n  -- Yeni kullanıcının metadata'sından rol, isim ve sınıf bilgilerini al.\n  -- Eğer bu bilgiler yoksa, rol için varsayılan olarak 'student' ata.\n  IF NEW.raw_user_meta_data IS NOT NULL THEN\n    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');\n    user_full_name := NEW.raw_user_meta_data->>'full_name';\n    user_grade := (NEW.raw_user_meta_data->>'grade')::INTEGER;\n  ELSE\n    user_role := 'student';\n  END IF;\n\n  -- `user_profiles` tablosuna yeni kullanıcı bilgilerini ekle.\n  -- Eğer aynı user_id ile bir kayıt zaten varsa, çakışmayı önle ve güncelle.\n  INSERT INTO public.user_profiles (user_id, role, full_name, email, grade)\n  VALUES (NEW.id, user_role::public.user_role, user_full_name, NEW.email, user_grade)\n  ON CONFLICT (user_id) DO UPDATE SET\n    role = EXCLUDED.role,\n    full_name = EXCLUDED.full_name,\n    email = EXCLUDED.email,\n    grade = EXCLUDED.grade,\n    updated_at = NOW();\n\n  -- `user_stats` tablosuna başlangıç kaydını ekle.\n  -- Çakışma durumunda hiçbir şey yapma.\n  INSERT INTO public.user_stats (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n\n  -- `user_streaks` tablosuna başlangıç kaydını ekle.\n  -- Çakışma durumunda hiçbir şey yapma.\n  INSERT INTO public.user_streaks (user_id)\n  VALUES (NEW.id)\n  ON CONFLICT (user_id) DO NOTHING;\n\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER","-- Adım 3: auth.users tablosu için trigger'ı oluştur.\n-- Önce eski trigger varsa diye temizle, sonra yenisini oluştur.\n-- Bu, her yeni kullanıcı eklendiğinde YALNIZCA bizim birleşik fonksiyonumuzun çalışmasını garanti eder.\nDROP TRIGGER IF EXISTS on_auth_user_created ON auth.users","CREATE TRIGGER on_auth_user_created\n  AFTER INSERT ON auth.users\n  FOR EACH ROW EXECUTE FUNCTION public.create_user_profile()"}	consolidate_user_creation_logic
20250805110955	{"-- Bu migration, user_stats ve user_streaks tablolarındaki RLS güvenlik açığını düzeltir.\n\n-- 1. ADIM: Eski ve güvensiz politikaları temizle\nDROP POLICY IF EXISTS \\"System can manage stats\\" ON public.user_stats","DROP POLICY IF EXISTS \\"System can manage streaks\\" ON public.user_streaks","-- Önceki RLS denemelerinden kalmış olabilecek diğer politikaları da temizleyelim.\nDROP POLICY IF EXISTS \\"İlgili taraflar ve Adminler istatistikleri görebilir\\" ON public.user_stats","DROP POLICY IF EXISTS \\"İlgili taraflar ve Adminler serileri görebilir\\" ON public.user_streaks","-- 2. ADIM: user_stats için güvenli politikaları oluştur\n\n-- Kural 1: Sadece yetkili kişilerin verileri GÖRMESİNE (SELECT) izin ver.\nCREATE POLICY \\"İlgili taraflar ve Adminler istatistikleri görebilir\\" ON public.user_stats\nFOR SELECT TO authenticated USING (\n  (auth.uid() = user_id) OR\n  ((SELECT role FROM public.user_profiles WHERE user_id = auth.uid()) IN ('admin', 'superadmin')) OR\n  (EXISTS (SELECT 1 FROM public.parent_student_links WHERE parent_student_links.parent_id = auth.uid() AND parent_student_links.student_id = user_stats.user_id)) OR\n  (EXISTS (SELECT 1 FROM public.teacher_student_links WHERE teacher_student_links.teacher_id = auth.uid() AND teacher_student_links.student_id = user_stats.user_id))\n)","-- Kural 2: YAZMA, GÜNCELLEME, SİLME (ALL) işlemlerini istemci tarafından tamamen engelle.\nCREATE POLICY \\"Client-side yazma işlemleri engellendi (stats)\\" ON public.user_stats\nFOR ALL USING (false) WITH CHECK (false)","-- 3. ADIM: user_streaks için güvenli politikaları oluştur\n\n-- Kural 1: Sadece yetkili kişilerin verileri GÖRMESİNE (SELECT) izin ver.\nCREATE POLICY \\"İlgili taraflar ve Adminler serileri görebilir\\" ON public.user_streaks\nFOR SELECT TO authenticated USING (\n  (auth.uid() = user_id) OR\n  ((SELECT role FROM public.user_profiles WHERE user_id = auth.uid()) IN ('admin', 'superadmin')) OR\n  (EXISTS (SELECT 1 FROM public.parent_student_links WHERE parent_student_links.parent_id = auth.uid() AND parent_student_links.student_id = user_streaks.user_id)) OR\n  (EXISTS (SELECT 1 FROM public.teacher_student_links WHERE teacher_student_links.teacher_id = auth.uid() AND teacher_student_links.student_id = user_streaks.user_id))\n)","-- Kural 2: YAZMA, GÜNCELLEME, SİLME (ALL) işlemlerini istemci tarafından tamamen engelle.\nCREATE POLICY \\"Client-side yazma işlemleri engellendi (streaks)\\" ON public.user_streaks\nFOR ALL USING (false) WITH CHECK (false)"}	fix_rls_for_stats_and_streaks
\.


--
-- Data for Name: seed_files; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.seed_files (path, hash) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 65, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: daily_leaderboard daily_leaderboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_leaderboard
    ADD CONSTRAINT daily_leaderboard_pkey PRIMARY KEY (id);


--
-- Name: daily_leaderboard daily_leaderboard_user_id_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_leaderboard
    ADD CONSTRAINT daily_leaderboard_user_id_date_key UNIQUE (user_id, date);


--
-- Name: parent_student_links parent_student_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_student_links
    ADD CONSTRAINT parent_student_links_pkey PRIMARY KEY (id);


--
-- Name: point_history point_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.point_history
    ADD CONSTRAINT point_history_pkey PRIMARY KEY (id);


--
-- Name: quiz_assignments quiz_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_assignments
    ADD CONSTRAINT quiz_assignments_pkey PRIMARY KEY (id);


--
-- Name: quiz_attempts quiz_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id);


--
-- Name: teacher_applications teacher_applications_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_applications
    ADD CONSTRAINT teacher_applications_email_key UNIQUE (email);


--
-- Name: teacher_applications teacher_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_applications
    ADD CONSTRAINT teacher_applications_pkey PRIMARY KEY (id);


--
-- Name: teacher_student_links teacher_student_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_student_links
    ADD CONSTRAINT teacher_student_links_pkey PRIMARY KEY (id);


--
-- Name: parent_student_links unique_parent_student; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_student_links
    ADD CONSTRAINT unique_parent_student UNIQUE (parent_id, student_id);


--
-- Name: user_badges user_badges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_pkey PRIMARY KEY (id);


--
-- Name: user_badges user_badges_user_id_badge_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_badge_id_key UNIQUE (user_id, badge_id);


--
-- Name: user_profiles user_profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_email_key UNIQUE (email);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);


--
-- Name: user_stats user_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stats
    ADD CONSTRAINT user_stats_pkey PRIMARY KEY (id);


--
-- Name: user_stats user_stats_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stats
    ADD CONSTRAINT user_stats_user_id_key UNIQUE (user_id);


--
-- Name: user_streaks user_streaks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_streaks
    ADD CONSTRAINT user_streaks_pkey PRIMARY KEY (id);


--
-- Name: user_streaks user_streaks_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_streaks
    ADD CONSTRAINT user_streaks_user_id_key UNIQUE (user_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: seed_files seed_files_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.seed_files
    ADD CONSTRAINT seed_files_pkey PRIMARY KEY (path);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_analytics_events_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_events_created_at ON public.analytics_events USING btree (created_at);


--
-- Name: idx_analytics_events_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_analytics_events_user_id ON public.analytics_events USING btree (user_id);


--
-- Name: idx_content_creator_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_content_creator_id ON public.content USING btree (creator_id);


--
-- Name: idx_daily_leaderboard_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_daily_leaderboard_date ON public.daily_leaderboard USING btree (date);


--
-- Name: idx_point_history_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_point_history_created_at ON public.point_history USING btree (created_at);


--
-- Name: idx_point_history_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_point_history_user_id ON public.point_history USING btree (user_id);


--
-- Name: idx_quiz_attempts_completed_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_quiz_attempts_completed_at ON public.quiz_attempts USING btree (completed_at);


--
-- Name: idx_quiz_attempts_quiz_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_quiz_attempts_quiz_id ON public.quiz_attempts USING btree (quiz_id);


--
-- Name: idx_quiz_attempts_student_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_quiz_attempts_student_id ON public.quiz_attempts USING btree (student_id);


--
-- Name: idx_user_badges_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_badges_user_id ON public.user_badges USING btree (user_id);


--
-- Name: idx_user_profiles_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_profiles_email ON public.user_profiles USING btree (email);


--
-- Name: idx_user_profiles_level; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_profiles_level ON public.user_profiles USING btree (level);


--
-- Name: idx_user_profiles_role; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_profiles_role ON public.user_profiles USING btree (role);


--
-- Name: idx_user_profiles_total_xp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_profiles_total_xp ON public.user_profiles USING btree (total_xp);


--
-- Name: idx_user_profiles_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_profiles_user_id ON public.user_profiles USING btree (user_id);


--
-- Name: idx_user_stats_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_stats_user_id ON public.user_stats USING btree (user_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: users create_user_profile_trigger; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER create_user_profile_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();


--
-- Name: user_profiles update_user_profile_timestamp_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_user_profile_timestamp_trigger BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_user_profile_timestamp();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: analytics_events analytics_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: content content_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.user_profiles(user_id) ON DELETE SET NULL;


--
-- Name: daily_leaderboard daily_leaderboard_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_leaderboard
    ADD CONSTRAINT daily_leaderboard_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: parent_student_links parent_student_links_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_student_links
    ADD CONSTRAINT parent_student_links_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: parent_student_links parent_student_links_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent_student_links
    ADD CONSTRAINT parent_student_links_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: point_history point_history_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.point_history
    ADD CONSTRAINT point_history_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.content(id) ON DELETE SET NULL;


--
-- Name: point_history point_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.point_history
    ADD CONSTRAINT point_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: quiz_assignments quiz_assignments_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_assignments
    ADD CONSTRAINT quiz_assignments_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: quiz_assignments quiz_assignments_assigned_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_assignments
    ADD CONSTRAINT quiz_assignments_assigned_to_user_id_fkey FOREIGN KEY (assigned_to_user_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: quiz_assignments quiz_assignments_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_assignments
    ADD CONSTRAINT quiz_assignments_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: teacher_applications teacher_applications_reviewed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_applications
    ADD CONSTRAINT teacher_applications_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id);


--
-- Name: teacher_student_links teacher_student_links_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_student_links
    ADD CONSTRAINT teacher_student_links_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: teacher_student_links teacher_student_links_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_student_links
    ADD CONSTRAINT teacher_student_links_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.user_profiles(user_id) ON DELETE CASCADE;


--
-- Name: user_badges user_badges_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_badges
    ADD CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_stats user_stats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stats
    ADD CONSTRAINT user_stats_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_streaks user_streaks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_streaks
    ADD CONSTRAINT user_streaks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: teacher_applications Adminler öğretmen başvurularını görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Adminler öğretmen başvurularını görebilir" ON public.teacher_applications FOR SELECT TO authenticated USING ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role])));


--
-- Name: teacher_applications Adminler öğretmen başvurularını güncelleyebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Adminler öğretmen başvurularını güncelleyebilir" ON public.teacher_applications FOR UPDATE TO authenticated USING ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role]))) WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['superadmin'::public.user_role, 'admin'::public.user_role])));


--
-- Name: analytics_events Client-side eklemeler engellendi; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side eklemeler engellendi" ON public.analytics_events FOR INSERT TO authenticated WITH CHECK (false);


--
-- Name: daily_leaderboard Client-side eklemeler engellendi; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side eklemeler engellendi" ON public.daily_leaderboard FOR INSERT TO authenticated WITH CHECK (false);


--
-- Name: point_history Client-side eklemeler engellendi; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side eklemeler engellendi" ON public.point_history FOR INSERT TO authenticated WITH CHECK (false);


--
-- Name: user_badges Client-side eklemeler engellendi; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side eklemeler engellendi" ON public.user_badges FOR INSERT TO authenticated WITH CHECK (false);


--
-- Name: user_stats Client-side yazma işlemleri engellendi (stats); Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side yazma işlemleri engellendi (stats)" ON public.user_stats USING (false) WITH CHECK (false);


--
-- Name: user_streaks Client-side yazma işlemleri engellendi (streaks); Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Client-side yazma işlemleri engellendi (streaks)" ON public.user_streaks USING (false) WITH CHECK (false);


--
-- Name: daily_leaderboard Herkes liderlik tablosunu görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Herkes liderlik tablosunu görebilir" ON public.daily_leaderboard FOR SELECT USING (true);


--
-- Name: teacher_applications Herkes öğretmenlik başvurusu yapabilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Herkes öğretmenlik başvurusu yapabilir" ON public.teacher_applications FOR INSERT WITH CHECK (true);


--
-- Name: content Kullanıcılar ilgili quizleri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Kullanıcılar ilgili quizleri görebilir" ON public.content FOR SELECT TO authenticated USING (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role) OR (EXISTS ( SELECT 1
   FROM public.quiz_assignments
  WHERE ((quiz_assignments.quiz_id = content.id) AND ((quiz_assignments.assigned_to_user_id = auth.uid()) OR (quiz_assignments.assigned_to_grade = ( SELECT content.grade
           FROM public.user_profiles
          WHERE (user_profiles.user_id = auth.uid())))))))));


--
-- Name: user_profiles Kullanıcılar kendi profilini güncelleyebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir" ON public.user_profiles FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: content Quiz'i sadece oluşturanlar veya Adminler güncelleyebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Quiz'i sadece oluşturanlar veya Adminler güncelleyebilir" ON public.content FOR UPDATE TO authenticated USING (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role))) WITH CHECK (((creator_id = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'superadmin'::public.user_role)));


--
-- Name: user_profiles Rol bazlı profil görüntüleme kuralları; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Rol bazlı profil görüntüleme kuralları" ON public.user_profiles FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles_1.role
   FROM public.user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (role = 'teacher'::public.user_role) OR ((( SELECT user_profiles_1.role
   FROM public.user_profiles user_profiles_1
  WHERE (user_profiles_1.user_id = auth.uid())) = 'teacher'::public.user_role) AND (role = 'student'::public.user_role) AND (NOT (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE (teacher_student_links.student_id = user_profiles.user_id)))))));


--
-- Name: analytics_events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

--
-- Name: content; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

--
-- Name: daily_leaderboard; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.daily_leaderboard ENABLE ROW LEVEL SECURITY;

--
-- Name: parent_student_links; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;

--
-- Name: point_history; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.point_history ENABLE ROW LEVEL SECURITY;

--
-- Name: quiz_assignments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.quiz_assignments ENABLE ROW LEVEL SECURITY;

--
-- Name: quiz_attempts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

--
-- Name: teacher_applications; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.teacher_applications ENABLE ROW LEVEL SECURITY;

--
-- Name: teacher_student_links; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.teacher_student_links ENABLE ROW LEVEL SECURITY;

--
-- Name: user_badges; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

--
-- Name: user_profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_stats; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

--
-- Name: user_streaks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

--
-- Name: parent_student_links Öğrenciler veli daveti oluşturabilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğrenciler veli daveti oluşturabilir" ON public.parent_student_links FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));


--
-- Name: quiz_attempts Öğrenciler yeni quiz denemesi ekleyebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğrenciler yeni quiz denemesi ekleyebilir" ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));


--
-- Name: teacher_student_links Öğrenciler öğretmene başvurabilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğrenciler öğretmene başvurabilir" ON public.teacher_student_links FOR INSERT TO authenticated WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'student'::public.user_role) AND (auth.uid() = student_id)));


--
-- Name: teacher_student_links Öğretmenler başvuru durumunu güncelleyebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğretmenler başvuru durumunu güncelleyebilir" ON public.teacher_student_links FOR UPDATE TO authenticated USING (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'teacher'::public.user_role) AND (auth.uid() = teacher_id))) WITH CHECK (((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = 'teacher'::public.user_role) AND (auth.uid() = teacher_id)));


--
-- Name: quiz_assignments Öğretmenler ve Adminler quiz atayabilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğretmenler ve Adminler quiz atayabilir" ON public.quiz_assignments FOR INSERT TO authenticated WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['teacher'::public.user_role, 'admin'::public.user_role, 'superadmin'::public.user_role])));


--
-- Name: content Öğretmenler ve Adminler quiz oluşturabilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Öğretmenler ve Adminler quiz oluşturabilir" ON public.content FOR INSERT TO authenticated WITH CHECK ((( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['teacher'::public.user_role, 'superadmin'::public.user_role])));


--
-- Name: analytics_events İlgili taraflar ve Adminler analizleri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler analizleri görebilir" ON public.analytics_events FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = analytics_events.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = analytics_events.user_id))))));


--
-- Name: quiz_assignments İlgili taraflar ve Adminler atamaları görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler atamaları görebilir" ON public.quiz_assignments FOR SELECT TO authenticated USING (((assigned_to_user_id = auth.uid()) OR (assigned_by = auth.uid()) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));


--
-- Name: parent_student_links İlgili taraflar ve Adminler bağlantıyı görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler bağlantıyı görebilir" ON public.parent_student_links FOR SELECT TO authenticated USING (((auth.uid() = parent_id) OR (auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));


--
-- Name: teacher_student_links İlgili taraflar ve Adminler bağlantıyı görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler bağlantıyı görebilir" ON public.teacher_student_links FOR SELECT TO authenticated USING (((auth.uid() = teacher_id) OR (auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role]))));


--
-- Name: quiz_attempts İlgili taraflar ve Adminler denemeleri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler denemeleri görebilir" ON public.quiz_attempts FOR SELECT TO authenticated USING (((auth.uid() = student_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = quiz_attempts.student_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = quiz_attempts.student_id))))));


--
-- Name: user_stats İlgili taraflar ve Adminler istatistikleri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler istatistikleri görebilir" ON public.user_stats FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_stats.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_stats.user_id))))));


--
-- Name: point_history İlgili taraflar ve Adminler puanları görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler puanları görebilir" ON public.point_history FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = point_history.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = point_history.user_id))))));


--
-- Name: user_badges İlgili taraflar ve Adminler rozetleri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler rozetleri görebilir" ON public.user_badges FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_badges.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_badges.user_id))))));


--
-- Name: user_streaks İlgili taraflar ve Adminler serileri görebilir; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "İlgili taraflar ve Adminler serileri görebilir" ON public.user_streaks FOR SELECT TO authenticated USING (((auth.uid() = user_id) OR (( SELECT user_profiles.role
   FROM public.user_profiles
  WHERE (user_profiles.user_id = auth.uid())) = ANY (ARRAY['admin'::public.user_role, 'superadmin'::public.user_role])) OR (EXISTS ( SELECT 1
   FROM public.parent_student_links
  WHERE ((parent_student_links.parent_id = auth.uid()) AND (parent_student_links.student_id = user_streaks.user_id)))) OR (EXISTS ( SELECT 1
   FROM public.teacher_student_links
  WHERE ((teacher_student_links.teacher_id = auth.uid()) AND (teacher_student_links.student_id = user_streaks.user_id))))));


--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION calculate_level(xp integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.calculate_level(xp integer) TO anon;
GRANT ALL ON FUNCTION public.calculate_level(xp integer) TO authenticated;
GRANT ALL ON FUNCTION public.calculate_level(xp integer) TO service_role;


--
-- Name: FUNCTION create_user_profile(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_user_profile() TO anon;
GRANT ALL ON FUNCTION public.create_user_profile() TO authenticated;
GRANT ALL ON FUNCTION public.create_user_profile() TO service_role;


--
-- Name: FUNCTION update_user_profile_timestamp(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_user_profile_timestamp() TO anon;
GRANT ALL ON FUNCTION public.update_user_profile_timestamp() TO authenticated;
GRANT ALL ON FUNCTION public.update_user_profile_timestamp() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE analytics_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.analytics_events TO anon;
GRANT ALL ON TABLE public.analytics_events TO authenticated;
GRANT ALL ON TABLE public.analytics_events TO service_role;


--
-- Name: TABLE content; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.content TO anon;
GRANT ALL ON TABLE public.content TO authenticated;
GRANT ALL ON TABLE public.content TO service_role;


--
-- Name: TABLE daily_leaderboard; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.daily_leaderboard TO anon;
GRANT ALL ON TABLE public.daily_leaderboard TO authenticated;
GRANT ALL ON TABLE public.daily_leaderboard TO service_role;


--
-- Name: TABLE parent_student_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.parent_student_links TO anon;
GRANT ALL ON TABLE public.parent_student_links TO authenticated;
GRANT ALL ON TABLE public.parent_student_links TO service_role;


--
-- Name: TABLE point_history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.point_history TO anon;
GRANT ALL ON TABLE public.point_history TO authenticated;
GRANT ALL ON TABLE public.point_history TO service_role;


--
-- Name: TABLE quiz_assignments; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.quiz_assignments TO anon;
GRANT ALL ON TABLE public.quiz_assignments TO authenticated;
GRANT ALL ON TABLE public.quiz_assignments TO service_role;


--
-- Name: TABLE quiz_attempts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.quiz_attempts TO anon;
GRANT ALL ON TABLE public.quiz_attempts TO authenticated;
GRANT ALL ON TABLE public.quiz_attempts TO service_role;


--
-- Name: TABLE teacher_applications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.teacher_applications TO anon;
GRANT ALL ON TABLE public.teacher_applications TO authenticated;
GRANT ALL ON TABLE public.teacher_applications TO service_role;


--
-- Name: TABLE teacher_student_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.teacher_student_links TO anon;
GRANT ALL ON TABLE public.teacher_student_links TO authenticated;
GRANT ALL ON TABLE public.teacher_student_links TO service_role;


--
-- Name: TABLE user_badges; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_badges TO anon;
GRANT ALL ON TABLE public.user_badges TO authenticated;
GRANT ALL ON TABLE public.user_badges TO service_role;


--
-- Name: TABLE user_profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_profiles TO anon;
GRANT ALL ON TABLE public.user_profiles TO authenticated;
GRANT ALL ON TABLE public.user_profiles TO service_role;


--
-- Name: TABLE user_stats; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_stats TO anon;
GRANT ALL ON TABLE public.user_stats TO authenticated;
GRANT ALL ON TABLE public.user_stats TO service_role;


--
-- Name: TABLE user_streaks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_streaks TO anon;
GRANT ALL ON TABLE public.user_streaks TO authenticated;
GRANT ALL ON TABLE public.user_streaks TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

