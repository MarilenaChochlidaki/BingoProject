import React from "react";

export const UserWallCard = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>Wins: {user.wins}</p>
      <p>Color: {user.color}</p>
    </div>
  );
};
