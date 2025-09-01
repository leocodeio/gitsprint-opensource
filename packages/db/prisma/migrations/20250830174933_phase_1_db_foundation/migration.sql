-- CreateTable
CREATE TABLE "gitsprint"."github_repositories" (
    "id" TEXT NOT NULL,
    "githubRepoId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "github_repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gitsprint"."github_issues" (
    "id" BIGINT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "state" TEXT NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "storyId" TEXT,

    CONSTRAINT "github_issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_repositories_githubRepoId_key" ON "gitsprint"."github_repositories"("githubRepoId");

-- CreateIndex
CREATE UNIQUE INDEX "github_repositories_fullName_key" ON "gitsprint"."github_repositories"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "github_repositories_projectId_key" ON "gitsprint"."github_repositories"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "github_issues_storyId_key" ON "gitsprint"."github_issues"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "github_issues_repoId_number_key" ON "gitsprint"."github_issues"("repoId", "number");

-- AddForeignKey
ALTER TABLE "gitsprint"."github_repositories" ADD CONSTRAINT "github_repositories_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "gitsprint"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitsprint"."github_issues" ADD CONSTRAINT "github_issues_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "gitsprint"."github_repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitsprint"."github_issues" ADD CONSTRAINT "github_issues_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "gitsprint"."stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
