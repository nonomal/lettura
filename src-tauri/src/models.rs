use super::schema::{articles, feed_metas, feeds, folders};
use diesel::sql_types::*;
use serde::Serialize;

#[derive(Debug, Clone, Queryable, Serialize, QueryableByName)]
pub struct Feed {
  #[diesel(sql_type = Integer)]
  pub id: i32,

  #[diesel(sql_type = Text)]
  pub uuid: String,

  #[diesel(sql_type = Text)]
  pub title: String,

  #[diesel(sql_type = Text)]
  pub link: String,

  #[diesel(sql_type = Text)]
  pub feed_url: String,

  #[diesel(sql_type = Text)]
  pub feed_type: String,

  #[diesel(sql_type = Text)]
  pub description: String,

  #[diesel(sql_type = Text)]
  pub pub_date: String,

  #[diesel(sql_type = Text)]
  pub updated: String,

  #[diesel(sql_type = Text)]
  pub logo: String,

  #[diesel(sql_type = Integer)]
  pub health_status: i32,

  #[diesel(sql_type = Text)]
  pub failure_reason: String,

  #[diesel(sql_type = Integer)]
  pub sort: i32,

  #[diesel(sql_type = Integer)]
  pub sync_interval: i32,

  #[diesel(sql_type = Text)]
  pub last_sync_date: String,

  #[diesel(sql_type = Text)]
  pub create_date: String,

  #[diesel(sql_type = Text)]
  pub update_date: String,
}

#[derive(Debug, Clone, Serialize, Insertable)]
#[diesel(table_name = feeds)]
pub struct NewFeed {
  pub uuid: String,
  pub feed_type: String,
  pub title: String,
  pub link: String,
  pub logo: String,
  pub feed_url: String,
  pub description: String,
  pub pub_date: String,
  pub updated: String,
  pub sort: i32,
}

#[derive(Debug, Queryable, Serialize, QueryableByName)]
pub struct FeedMeta {
  #[diesel(sql_type = Integer)]
  pub id: i32,
  #[diesel(sql_type = Text)]
  pub uuid: String,
  #[diesel(sql_type = Text)]
  pub folder_uuid: Option<String>,
  #[diesel(sql_type = Integer)]
  pub sort: i32,
  #[diesel(sql_type = Text)]
  pub create_date: String,
  #[diesel(sql_type = Text)]
  pub update_date: String,
}

#[derive(Debug, Insertable)]
#[diesel(table_name = feed_metas)]
pub struct NewFeedMeta {
  pub uuid: String,
  pub folder_uuid: String,
  pub sort: i32,
}

#[derive(Debug, Queryable, Serialize, Associations, QueryableByName)]
#[diesel(belongs_to(Feed, foreign_key = uuid))]
pub struct Article {
  #[diesel(sql_type = Integer)]
  pub id: i32,

  #[diesel(sql_type = Text)]
  pub uuid: String,

  #[diesel(sql_type = Text)]
  pub title: String,

  #[diesel(sql_type = Text)]
  pub link: String,

  #[diesel(sql_type = Text)]
  pub feed_url: String,

  #[diesel(sql_type = Text)]
  pub feed_uuid: String,

  #[diesel(sql_type = Text)]
  pub description: String,

  #[diesel(sql_type = Text)]
  pub author: String,

  #[diesel(sql_type = Text)]
  pub pub_date: String,

  #[diesel(sql_type = Text)]
  pub content: String,

  #[diesel(sql_type = Text)]
  pub create_date: String,

  #[diesel(sql_type = Text)]
  pub update_date: String,

  #[diesel(sql_type = Integer)]
  pub read_status: i32,

  #[diesel(sql_type = Text)]
  pub media_object: Option<String>,

  #[diesel(sql_type = Integer)]
  pub starred: i32,
}

#[derive(Debug, Insertable, Clone)]
#[diesel(table_name = articles)]
pub struct NewArticle {
  pub uuid: String,
  pub feed_uuid: String,
  pub title: String,
  pub link: String,
  pub feed_url: String,
  pub description: String,
  pub content: String,
  pub author: String,
  pub pub_date: String,
  pub media_object: String,
}

#[derive(Debug, Queryable, QueryableByName, Clone, Serialize)]
pub struct Folder {
  #[diesel(sql_type = Integer)]
  pub id: i32,
  #[diesel(sql_type = Text)]
  pub uuid: String,
  #[diesel(sql_type = Text)]
  pub name: String,
  #[diesel(sql_type = Integer)]
  pub sort: i32,
  #[diesel(sql_type = Text)]
  pub create_date: String,
  #[diesel(sql_type = Text)]
  pub update_date: String,
}

#[derive(Debug, Insertable, Clone)]
#[diesel(table_name = folders)]
pub struct NewFolder {
  pub uuid: String,
  pub name: String,
  pub sort: i32,
}
