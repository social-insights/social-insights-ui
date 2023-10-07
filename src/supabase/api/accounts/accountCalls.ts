import { supabase } from "../../supabase";

export function getOrgs() {
  return supabase.from("Organizations").select("*");
}

export function getOrg(orgId: number) {
  return supabase
    .from("Organizations")
    .select("*")
    .eq("org_id", orgId)
    .maybeSingle();
}

export function deleteOrg(id: number) {
  return supabase
    .from("Organizations")
    .delete({ count: "exact" })
    .eq("org_id", id)
    .select("*");
}

export function createOrg(name: string) {
  return supabase.from("Organizations").insert({ name: name }).select("*");
}

export function getOrgUsers(orgId: number) {
  return supabase
    .from("Organizations")
    .select("user_ids")
    .eq("org_id", orgId)
    .single();
}

export function addUser(orgId: number, userId: string) {
  return supabase.rpc("append_user", { in_org_id: orgId, in_user_id: userId });
}

export function removeUser(orgId: number, userId: string) {
  return supabase.rpc("remove_user", { in_org_id: orgId, in_user_id: userId });
}

export function getUserOrgs(userId: string) {
  return supabase
    .from("Organizations")
    .select("*")
    .contains("user_ids", "{" + userId + "}");
}

export async function userInOrg(orgId: number, userId: string) {
  const r = await supabase
    .from("Organizations")
    .select("*")
    .eq("org_id", orgId)
    .contains("user_ids", "{" + userId + "}");
  return r.data?.length! > 0;
}

export function createInvite(orgId: number, senderId: string) {
  return supabase
    .from("Organization Invites")
    .insert({
      organization_id: orgId,
      sender_id: senderId,
    })
    .select("*")
    .single();
}

export function acceptInvite(inviteId: string, user: any) {
  return supabase
    .from("Organization Invites")
    .select("*")
    .eq("id", inviteId)
    .single()
    .then((res: { data: any; error: any }) => {
      if (res.data) {
        // add user to org
        // delete invite
        // return org
        return addUser(res.data?.organization_id, user.id).then((r) => {
          return (
            supabase
              .from("Organization Invites")
              .delete()
              .eq("id", inviteId)
              .single()
          );
        });
      } else {
        return res.error;
      }
    });
}

export function getInvite(inviteId: string) {
  return supabase
    .from("Organization Invites")
    .select("*")
    .eq("id", inviteId)
    .maybeSingle();
}
