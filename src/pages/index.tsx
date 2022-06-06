import React, { useState } from 'react';
import { Button } from 'antd';
import './index.less';
import { useForm } from 'form-render';
import FormCont from './form-cont';
const schema1 = {
  type: 'object',
  properties: {
    name: {
      title: '姓名1',
      type: 'string',
      props: {},
    },
    age: {
      title: '年龄1',
      type: 'string',
      props: {},
    },
  },
  labelWidth: 120,
  displayType: 'row',
};

const schema2 = {
  type: 'object',
  properties: {
    xname: {
      title: '姓名2',
      type: 'string',
      props: {},
    },
    xage: {
      title: '年龄2',
      type: 'string',
      props: {},
    },
  },
  labelWidth: 120,
  displayType: 'row',
};

export default function IndexPage() {
  const [active, setActive] = useState(0);
  const form = useForm();

  const onChange1 = (values: any) => {
    console.log('onChange1---', values);
  } 

  const onChange2 = (values: any) => {
    console.log('onChange2 -----', values);
  }


  return (
    <div>
      <div className="container">
        <div className="menu">
          <Button onClick={() => setActive(0)}>form1</Button>
          <Button onClick={() => setActive(1)}>form2</Button>
        </div>
        <div className="form-box">
          {active === 0 && (
            <div className="module">
              <FormCont schema={schema1} form={form} name="form1" onChange={onChange1}/>
            </div>
          )}
          {active === 1 && (
            <div className="module">
              <FormCont schema={schema2} form={form} name="form2" onChange={onChange2}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 当form1输入值后再切换到form2时，事件执行顺序如下
// onChange1--- {}
// form-cont.tsx:11 form---mount form1
// index.tsx:47 onChange1--- {name: '1', age: undefined}
// index.tsx:47 onChange1--- {name: '1', age: '1'}
// form-cont.tsx:13 form------unmount form1
// index.tsx:51 onChange2 ----- {name: '1', age: '1'} -----》这一条不应该执行才是对的
// form-cont.tsx:11 form---mount form2
// index.tsx:51 onChange2 ----- {xname: undefined, xage: undefined}