import { createFileRoute } from '@tanstack/react-router'
import CatMap from './index'

export const Route = createFileRoute('/catmap')({
  component: CatMap,
});