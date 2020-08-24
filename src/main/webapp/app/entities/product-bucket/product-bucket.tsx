import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BucketCard from './BucketCard'

// Material-ui
import { Alert } from '@material-ui/lab'
import { Container,  Grid, Typography } from '@material-ui/core'

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-bucket.reducer';
import { IProductBucket } from 'app/shared/model/product-bucket.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { Color } from '@material-ui/lab/Alert/Alert'


export interface IProductBucketProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProductBucket = (props: IProductBucketProps) => {

  const successAlert : Color = ('success');
  const errorAlert : Color = ('error')


  const [ alert, setAlert ] = useState({ state: '', status: false, message: ''})


  useEffect(() => {
    props.getEntities();
  }, []);
  const { productBucketList, match, loading } = props;

  return (
    <Fragment>
      <Container  maxWidth='lg' >
        {
                      alert.status ? 
                      <Alert className='alert-submit' severity={ alert.state === 'error'? errorAlert : successAlert } >{ alert.message }</Alert>
                      :
                        null
        }
        <Typography className='subtitle' component='h3' variant='h3' >Buckets</Typography>
        <Grid className='grid-container' container spacing={2} alignContent='stretch'>
        {
          productBucketList.map(bucket => 
            <BucketCard 
              getEntities={props.getEntities} 
              match={match.url} 
              bucketsList={...productBucketList} 
              key={bucket.id} 
              bucket={bucket} 
              alert={alert}
              setAlert={setAlert}/>)
        }
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = ({ productBucket }: IRootState) => ({
  productBucketList: productBucket.entities,
  loading: productBucket.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductBucket);
