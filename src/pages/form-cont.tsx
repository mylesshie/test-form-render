import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';

const FormCont = ({schema, form, name, onChange, ...rest}: any) => {
  const watchs = {
    '#': (val: any) => {
      onChange && onChange(val);
    }
  }
  useEffect(() => {
    console.log('form---mount', name)
    return () => {
      console.log('form------unmount', name)
    }
  }, [])
  return <FormRender schema={schema} form={form} {...rest} watch={watchs}></FormRender>
}

export default FormCont;