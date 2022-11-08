import React from 'react'

import { Layout } from '../components/layout'
import { Hero } from '../components/hero'
import { HeroIllustration } from '../components/hero-illustration'

export default function HomePage() {
  return (
    <Layout>
      <Hero
        title="Test de front-end en React"
        content="Voici les fonctions de mon ERC20 'MyToken' qui peuvent être appelées :"
        illustration={<HeroIllustration />}
      />
    </Layout>
  )
}
