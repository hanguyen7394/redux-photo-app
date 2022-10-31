import PropTypes from 'prop-types';
import React from 'react';
import { Formik, Form, FastField } from 'formik';
import { Button, FormGroup } from 'reactstrap';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addPhoto } from 'features/Photo/photoSlice'
import { useHistory } from 'react-router-dom';

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}

function PhotoForm(props) {
  const initialValues = {
    title: '',
    categoryId: null,
    photo: ''
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required!'),
    categoryId: Yup.number().required('This field is required!').nullable(),
    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required!'),
      otherwise: Yup.string().notRequired()
    })
  })

  const handleSubmit = (values) => {

    dispatch(addPhoto(values));
    history.push('/photos');
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values)}
    >
      {
        formikProps => {
          return (
            <Form>
              <FastField
                name="title"
                component={InputField}
                label="Title"
                placeholder="Eg: Wow nature ..."
              />

              <FastField
                name="categoryId"
                component={SelectField}
                label="Category"
                placeholder="What's your photo category?"
                options={PHOTO_CATEGORY_OPTIONS}
              />

              <FastField
                name="photo"
                component={RandomPhotoField}
                label="Photo"
              />

              <FormGroup>
                <Button type="submit" color="primary">Add to album</Button>
              </FormGroup>
            </Form>
          )
        }
      }
    </Formik>
  );
}

export default PhotoForm;