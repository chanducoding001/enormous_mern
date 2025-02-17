import { Form, Formik } from 'formik';
import React from 'react'
import SubmitBtn from '../reusables/SubmitBtn';
import AllFields from '../reusables/AllFields';
import ReuseModal from '../reusables/ReuseModal';

const useFormHook = (formProps) => {
    const {initialValues,onSubmit,validationSchema,formData,title,modalProps} = formProps;
  return (
    <>
    <div className='formContainer makeCenter'>
    <h1 className='title'>{title}</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
              {
                formData?.map((e)=>(
                  <AllFields
                  key={e.id}
                  name={e.name}
                  placeholder={e.placeholder}
                  type={e.type}
                  componentType={e.componentType}
                  options={e?.options}
                  />
                ))
              }
              <SubmitBtn
                text='Submit'
                handleClick={()=>{}}
                type='submit'
                />
            </Form>
      </Formik>
    </div>
    <ReuseModal 
          open={modalProps?.open}
          handleClose={modalProps?.handleClose}
          modalTitle={modalProps.title}
          modalBody={modalProps.body}
          />
    </>
  )
}

export default useFormHook;
