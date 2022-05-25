import React from 'react';

import TransactionSnackbar from './TransactionSnackbar';
import { useActivePopups } from '../../state/application/hooks';

export default function Popups() {
  const activePopups = useActivePopups();

  return (
    <>
      {
        activePopups.map((p, i) => (
          <TransactionSnackbar
            key={i}
            index={i}
            notificationCount={i + 1}
            open
            content={p.content}
          />
        ))
      }
    </>
  );
}
