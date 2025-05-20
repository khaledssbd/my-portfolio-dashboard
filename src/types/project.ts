export interface IProject {
  _id: string;
  title: string;
  description: string;
  features: string;
  image: string;
  stacks: string[];
  liveURL: string;
  frontEndGitHubURL: string;
  backEndGitHubURL: string;
  createdAt: Date;
  updatedAt: Date;
}
