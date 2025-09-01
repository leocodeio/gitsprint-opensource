import {
  PrismaClient,
  User,
  Organization,
  Team,
  Project,
  Sprint,
  Story,
  $Enums,
  OrganizationMember,
  TeamMember,
  GithubRepository,
} from "@prisma/client";

// User domain types

export type xUser = User;
export type xDomainUser = Partial<
  Pick<
    User,
    | "id"
    | "name"
    | "email"
    | "emailVerified"
    | "image"
    | "role"
    | "phone"
    | "phoneVerified"
    | "profileCompleted"
    | "subscriptionId"
  >
>;

// Organization domain types
export type xOrganization = Organization;
export type xDomainOrganization = Partial<
  Pick<Organization, "id" | "name" | "slug" | "ownerId">
> & {
  members?: xDomainOrganizationMember[];
  teams?: xDomainTeam[];
  projects?: xDomainProject[];
};
export type xOrganizationMemberRole = $Enums.OrganizationMemberRole;
export type xOrganizationMember = OrganizationMember;
export type xDomainOrganizationMember = Partial<
  Pick<OrganizationMember, "id" | "role" | "orgId" | "userId">
>;

// Team domain types
export type xTeam = Team;
export type xTeamMemberRole = $Enums.TeamMemberRole;
export type xTeamMember = TeamMember;
export type xDomainTeamMember = Partial<
  Pick<TeamMember, "id" | "role" | "teamId" | "userId">
>;
export type xDomainTeam = Partial<
  Pick<Team, "id" | "name" | "description" | "orgId">
> & {
  members?: xDomainTeamMember[];
};

// Project domain types

export type xProject = Project;
export type xDomainProject = Partial<
  Pick<Project, "id" | "name" | "description" | "orgId" | "teamId">
> & {
  sprints?: xDomainSprint[];
};

// Sprint domain types
export type xSprint = Sprint;

export type xDomainSprint = Partial<
  Pick<
    Sprint,
    | "id"
    | "name"
    | "goal"
    | "startDate"
    | "endDate"
    | "status"
    | "projectId"
    | "teamId"
  >
> & {
  stories?: xDomainStory[];
};

// Story domain types
export type xStory = Story;
export type xDomainStory = Partial<
  Pick<
    Story,
    | "id"
    | "title"
    | "description"
    | "points"
    | "priority"
    | "status"
    | "assigneeId"
    | "projectId"
    | "sprintId"
  >
>;

// Github repository domain types
export type xGithubRepository = GithubRepository;
export type xDomainGithubRepository = Partial<
  Pick<
    GithubRepository,
    | "id"
    | "githubRepoId"
    | "name"
    | "fullName"
    | "private"
    | "htmlUrl"
    | "description"
    | "projectId"
  >
>;

declare global {
  var __dbClient: PrismaClient;
}

export const prisma =
  global.__dbClient ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__dbClient = prisma;
}

export { PrismaClient };
