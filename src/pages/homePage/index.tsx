import React from 'react';
import styles from './index.module.scss';
import Project from './project';
import Team from './team';

export default function HomePage() {
  return (
    <div className={`${styles.wrapper} container`}>
      <Project />
      <Team />
    </div>
  );
}
