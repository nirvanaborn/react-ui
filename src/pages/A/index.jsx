import React from "react";
import { Button } from "antd";
import { nanoid } from "nanoid";

const A = () => {
  return (
    <>
      <div>This is A Page.</div>
      <Button
        type="primary"
        onClick={() => {
          console.log(nanoid(10));
        }}
      >
        生成nanoid
      </Button>
    </>
  );
};

export default A;
