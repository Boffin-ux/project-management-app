import React from 'react';
import styles from './homePage.module.scss';
import Project from './project/Project';
import Team from './team/Team';

export default function HomePage() {
  return (
    <div className={`${styles.wrapper} container`}>
      <Project />
      <Team />
    </div>
  );
}
