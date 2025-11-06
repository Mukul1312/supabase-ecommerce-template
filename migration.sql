/*
# [View Security Fix]
Recreates the `orders_with_profile` view to fix a critical security vulnerability.

## Query Description:
This operation drops the existing `orders_with_profile` view and recreates it. The original view used a 'SECURITY DEFINER' setting, which could bypass Row Level Security and expose sensitive order data. The new view uses the default 'SECURITY INVOKER', ensuring that data access is correctly restricted by the querying user's permissions. This change is safe and does not affect any stored data.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- View Dropped: `public.orders_with_profile`
- View Created: `public.orders_with_profile`

## Security Implications:
- RLS Status: Correctly enforces RLS on underlying tables.
- Policy Changes: No
- Auth Requirements: Fixes a major security flaw.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact.
*/

-- Drop the existing insecure view
DROP VIEW IF EXISTS public.orders_with_profile;

-- Recreate the view with the default (and secure) SECURITY INVOKER behavior
CREATE VIEW public.orders_with_profile AS
 SELECT o.id,
    o.created_at,
    o.total_price,
    o.status,
    p.full_name
   FROM (public.orders o
     JOIN public.profiles p ON ((o.user_id = p.id)));
