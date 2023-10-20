import { supabase } from "../supabase/supabase";

export type Profile = {
  username?: string;
  bio?: string;
  full_name?: string;
  id?: string;
  followers?: number;
  following?: number;
  profile_pic_url?: string;
  is_private?: boolean;
  last_updated?: string;
  org_id?: number;
};

const STALE_TIMEOUT = 30;

export function getInstagramUserByUsername(username: string, org_id: number) {
  // check supabase for the data first. if it exists and is not stale, return it
  // stale = older than 30 minutes
  // if the data is stale, or doesn't exist, fetch it from instagram and save it to supabase

  return supabase
    .from("Accounts")
    .select("*")
    .eq("username", username)
    .maybeSingle()
    .then((cacheData) => {
      if (
        cacheData.data &&
        Date.parse(cacheData.data.last_updated) >
          Date.now() - STALE_TIMEOUT * 60 * 1000
      ) {
        console.log("Data found");
        return cacheData;
      } else {
        console.log("no data");
        return fetch(
          `http://127.0.0.1:5001/social-insights-66e0d/us-central1/get_user/?username=${username}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            let account: Profile = data;
            account.org_id = org_id;
            if (!cacheData.data) {
              insertInstagramAccount(account);
            } else {
              updateInstagramAccount(account);
            }
            return data;
          });
      }
    });
}

export function getInstagramUserById(id: string, org_id: number) {
  // check supabase for the data first. if it exists and is not stale, return it
  // stale = older than 30 minutes
  // if the data is stale, or doesn't exist, fetch it from instagram and save it to supabase

  return supabase
    .from("Accounts")
    .select("*")
    .eq("account_id", id)
    .maybeSingle()
    .then((cacheData) => {
      if (
        cacheData.data &&
        Date.parse(cacheData.data.last_updated) >
          Date.now() - STALE_TIMEOUT * 60 * 1000
      ) {
        return cacheData;
      } else {
        return fetch(
          `http://127.0.0.1:5001/social-insights-66e0d/us-central1/get_user/?id=${id}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let account: Profile = data;
            account.org_id = org_id;
            if (!cacheData.data) {
              insertInstagramAccount(account);
            } else {
              updateInstagramAccount(account);
            }
            return data;
          });
      }
    });
}

export function updateInstagramAccount(account: Profile) {
  if (account.id) {
    supabase
      .from("Accounts")
      .update({
        account_id: account.id,
        org_id: account.org_id,
        username: account.username,
        bio: account.bio,
        full_name: account.full_name,
        followers: account.followers,
        following: account.following,
        profile_pic_url: account.profile_pic_url,
        is_private: account.is_private,
        last_updated: new Date().toISOString(),
      })
      .eq("account_id", account.id)
      .eq("org_id", account.org_id);
  } else if (account.username) {
    supabase
      .from("Accounts")
      .update({
        account_id: account.id,
        org_id: account.org_id,
        username: account.username,
        bio: account.bio,
        full_name: account.full_name,
        followers: account.followers,
        following: account.following,
        profile_pic_url: account.profile_pic_url,
        is_private: account.is_private,
        last_updated: new Date().toISOString(),
      })
      .eq("username", account.username)
      .eq("org_id", account.org_id);
  } else {
    console.log("No account id or username provided");
  }
}

export function insertInstagramAccount(account: Profile) {
  supabase.from("Accounts").insert({
    account_id: account.id,
    org_id: account.org_id,
    username: account.username,
    bio: account.bio,
    full_name: account.full_name,
    followers: account.followers,
    following: account.following,
    profile_pic_url: account.profile_pic_url,
    is_private: account.is_private,
    last_updated: new Date().toISOString(),
  });
}
