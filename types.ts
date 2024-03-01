export type TeamClaim = {
  team: Team,
  can_edit: boolean
}

export type Team = {
  id: string,
  display_name: string
}

export type ClerkPublicMetadata = {
  team_claims: TeamClaim[],
  ignore_token_timeout: boolean
}

export type NewFixture = {
  id?: string,
  team_for: TeamClaim;
  team_against: TeamClaim;
  date_time?: Date;
  venue?: string;
  points_for?: string;
  points_against?: string;
};