// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Seeding database...");

//   // Create test user (OAuth user simulation)
//   const testUser = await prisma.user.upsert({
//     where: { email: "test@gitsprint.dev" },
//     update: {},
//     create: {
//       id: "test-user-id",
//       name: "Test User",
//       email: "test@gitsprint.dev",
//       emailVerified: true,
//       image: "https://github.com/testuser.png",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       githubId: "12345",
//       githubUsername: "testuser",
//       googleId: "google-test-id",
//       role: "admin",
//       profileCompleted: true,
//     },
//   });

//   // Create test organization
//   const testOrg = await prisma.organization.upsert({
//     where: { slug: "test-org" },
//     update: {},
//     create: {
//       name: "Test Organization",
//       slug: "test-org",
//       ownerId: testUser.id,
//     },
//   });

//   // Add user as organization member
//   await prisma.organizationMember.upsert({
//     where: {
//       orgId_userId: {
//         orgId: testOrg.id,
//         userId: testUser.id,
//       },
//     },
//     update: {},
//     create: {
//       orgId: testOrg.id,
//       userId: testUser.id,
//       role: "OWNER",
//     },
//   });

//   // Create test team
//   const testTeam = await prisma.team.upsert({
//     where: { id: "test-team-id" },
//     update: {},
//     create: {
//       id: "test-team-id",
//       name: "Development Team",
//       description: "Main development team for GitSprint",
//       orgId: testOrg.id,
//     },
//   });

//   // Add user as team member
//   await prisma.teamMember.upsert({
//     where: {
//       teamId_userId: {
//         teamId: testTeam.id,
//         userId: testUser.id,
//       },
//     },
//     update: {},
//     create: {
//       teamId: testTeam.id,
//       userId: testUser.id,
//       role: "LEAD",
//     },
//   });

//   // Create test project
//   const testProject = await prisma.project.upsert({
//     where: { id: "test-project-id" },
//     update: {},
//     create: {
//       id: "test-project-id",
//       name: "GitSprint MVP",
//       description: "Main GitSprint application development",
//       githubRepoUrl: "https://github.com/leocodeio/gitsprint",
//       orgId: testOrg.id,
//       teamId: testTeam.id,
//     },
//   });

//   // Create test sprint
//   const testSprint = await prisma.sprint.upsert({
//     where: { id: "test-sprint-id" },
//     update: {},
//     create: {
//       id: "test-sprint-id",
//       name: "Sprint 1 - Foundation",
//       goal: "Implement core authentication and database models",
//       startDate: new Date(),
//       endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
//       status: "ACTIVE",
//       projectId: testProject.id,
//       teamId: testTeam.id,
//     },
//   });

//   // Create test stories
//   const stories = [
//     {
//       title: "Setup OAuth-only authentication",
//       description:
//         "Configure Better Auth with GitHub and Google OAuth providers",
//       points: 5,
//       priority: "HIGH",
//       status: "DONE",
//     },
//     {
//       title: "Design SaaS database models",
//       description:
//         "Create Organization, Team, Project, Sprint, and Story models",
//       points: 8,
//       priority: "HIGH",
//       status: "DONE",
//     },
//     {
//       title: "Create organization management UI",
//       description: "Build interface for creating and managing organizations",
//       points: 13,
//       priority: "MEDIUM",
//       status: "TODO",
//     },
//     {
//       title: "Implement sprint planning board",
//       description: "Create Kanban-style board for sprint planning",
//       points: 21,
//       priority: "HIGH",
//       status: "TODO",
//     },
//   ];

//   for (const [index, story] of stories.entries()) {
//     await prisma.story.upsert({
//       where: { id: `test-story-${index + 1}` },
//       update: {},
//       create: {
//         id: `test-story-${index + 1}`,
//         title: story.title,
//         description: story.description,
//         points: story.points,
//         priority: story.priority as any,
//         status: story.status as any,
//         assigneeId: testUser.id,
//         projectId: testProject.id,
//         sprintId: testSprint.id,
//       },
//     });
//   }

//   console.log("Seeding completed successfully!");
//   console.log(`Created test organization: ${testOrg.name}`);
//   console.log(`Created test team: ${testTeam.name}`);
//   console.log(`Created test project: ${testProject.name}`);
//   console.log(`Created test sprint: ${testSprint.name}`);
//   console.log(`Created ${stories.length} test stories`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
