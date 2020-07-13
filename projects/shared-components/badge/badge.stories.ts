import { BadgeComponent } from './badge.component';

export default {
  title: 'Badges',
  component: BadgeComponent
};

export const Regular = () => ({
  component: BadgeComponent,
  props: {
    text: 'Regular',
    fontSize: 'regular',
  },
});

export const Small = () => ({
  component: BadgeComponent,
  props: {
    text: 'Small',
    fontSize: 'small',
  },
});
