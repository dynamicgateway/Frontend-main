import React from 'react';

interface ActionsProps {
  actions: Array<Action>;
}
interface Action {
  label?: string;
  icon: React.ReactNode;
  onClick: () => void;
}
const Actions = ({ actions }: ActionsProps) => {
  return (
    <div className="flex cursor-pointer flex-row gap-2">
      {actions.map((action, index) =>
        action.label ? (
          <div key={index} className="flex flex-col items-center justify-center" onClick={action.onClick}>
            {action.label} {action.icon}
          </div>
        ) : (
          action.icon
        )
      )}
    </div>
  );
};
export default Actions;
