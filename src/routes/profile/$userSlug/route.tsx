import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from './index';

export const Route = createFileRoute('/profile/$userSlug')({
  component: ProfilePage,
});
