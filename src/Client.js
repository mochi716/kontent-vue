import Cookies from 'universal-cookie';
import { selectedProjectCookieName, defaultProjectId } from './Utilities/SelectedProject';

// kentico cloud
import { DeliveryClient, TypeResolver } from 'kentico-cloud-delivery';

const projectId = 'cbf6934c-956f-0006-799e-42054f50c3a6';//'dbb5068c-9ed9-00f3-7898-d3b46e31f9ed';
const previewApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwY2ZkYjI3NDRkMDE0OWY4ODgzMjU2NjI1MTBkNWJmOCIsImlhdCI6IjE1NDIzNjk5MTAiLCJleHAiOiIxODg3OTY5OTEwIiwicHJvamVjdF9pZCI6ImNiZjY5MzRjOTU2ZjAwMDY3OTllNDIwNTRmNTBjM2E2IiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9.SJsYWfghbiSNOkIKEIcXatKjGr-V5u89vSgjpza3ik4';//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5Y2YxNzFjYTFjOWM0ODgwOGZkNzdhOTI2MzI5Njg4YSIsImlhdCI6IjE1NDE1MzMxNTciLCJleHAiOiIxODg3MTMzMTU3IiwicHJvamVjdF9pZCI6ImRiYjUwNjhjOWVkOTAwZjM3ODk4ZDNiNDZlMzFmOWVkIiwidmVyIjoiMS4wLjAiLCJhdWQiOiJwcmV2aWV3LmRlbGl2ZXIua2VudGljb2Nsb3VkLmNvbSJ9.GEvEf_9u3vZEOJGQIoi0ps_TWeC5YbEPg5gGDrTMM1Y';

// models
import { AboutUs } from './Models/AboutUs'
import { Accessory } from './Models/Accessory'
import { Article } from './Models/Article'
import { Brewer } from './Models/Brewer'
import { Cafe } from './Models/Cafe'
import { Coffee } from './Models/Coffee'
import { FactAboutUs } from './Models/FactAboutUs'
import { Grinder } from './Models/Grinder'
import { HeroUnit } from './Models/HeroUnit'
import { Home } from './Models/Home'
import { HostedVideo } from './Models/HostedVideo'
import { Office } from './Models/Office'
import { Tweet } from './Models/Tweet'

// configure type resolvers
let typeResolvers = [
  new TypeResolver('about_us', () => new AboutUs()),
  new TypeResolver('accessory', () => new Accessory()),
  new TypeResolver('article', () => new Article()),
  new TypeResolver('brewer', () => new Brewer()),
  new TypeResolver('cafe', () => new Cafe()),
  new TypeResolver('coffee', () => new Coffee()),
  new TypeResolver('fact_about_us', () => new FactAboutUs()),
  new TypeResolver('grinder', () => new Grinder()),
  new TypeResolver('hero_unit', () => new HeroUnit()),
  new TypeResolver('home', () => new Home()),
  new TypeResolver('hosted_video', () => new HostedVideo()),
  new TypeResolver('office', () => new Office()),
  new TypeResolver('tweet', () => new Tweet())
];

const cookies = new Cookies(document.cookies);
let currentProjectId = projectId || cookies.get(selectedProjectCookieName);
if (currentProjectId) {
  cookies.set(selectedProjectCookieName, currentProjectId, { path: '/' });
} else {
  currentProjectId = defaultProjectId;
}

const isPreview = () => previewApiKey !== '';

let Client = new DeliveryClient({
  projectId: currentProjectId,
  typeResolvers: typeResolvers,
  previewApiKey: previewApiKey,
  enablePreviewMode: isPreview()
});


const resetClient = (newProjectId) => {
  Client = new DeliveryClient({
    projectId: newProjectId,
    typeResolvers: typeResolvers,
    previewApiKey: previewApiKey,
    enablePreviewMode: isPreview()
  });
  const cookies = new Cookies(document.cookies);
  cookies.set(selectedProjectCookieName, newProjectId, { path: '/' });
}

export {
  Client,
  resetClient
};