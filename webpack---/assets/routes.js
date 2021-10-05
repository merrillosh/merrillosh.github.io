/* Router */
import Landing from './views/landing.vue';
import Featured from './views/featured.vue';
import About from './views/about.vue';
import Index from './views/index.vue';
import Project from './views/project.vue';
import Illustration from './views/illustration.vue';
import Carousel from './views/carousel.vue';
import Navigation from './navigation/main.vue';
import ProjectsNavigation from './navigation/projects.vue';
import IllustrationNavigation from './navigation/illustration.vue';


export default [{
    path: '/',
    component: Landing,
    children: [{
            path: '',
            name: 'Featured',
            components: {
                carousel: Carousel,
                main: Featured,
                navigation: Navigation
            }
        },
        {
            path: 'about',
            name: 'About',
            components: {
                main: About,
                navigation: Navigation
            }
        },
        {
            path: 'index',
            name: 'Index',
            components: {
                main: Index,
                navigation: Navigation
            },
        },
        {
            path: 'index/:project',
            name: 'Project',
            components: {
                main: Project,
                navigation: ProjectsNavigation
            },
        },
        {
            path: 'illustration',
            name: 'Illustration',
            components: {
                main: Illustration,
                navigation: IllustrationNavigation
            },
        },
        {
            path: 'illustration/:project',
            name: 'Illustration Project',
            components: {
                main: Project,
                navigation: IllustrationNavigation
            },
        },
    ]
}]