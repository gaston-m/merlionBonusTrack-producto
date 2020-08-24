import React, { useState, useEffect } from 'react';
import { Button as ButtonLink, Col, Row, Table } from 'reactstrap';
import axios from 'axios'


// Material-ui

import { 
    Grid, 
    Card, 
    CardContent, 
    Typography,
    Button,
    TextField,
    MenuItem,
    Select,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    InputLabel,
    Input,
    FormControl          
} from '@material-ui/core'


// FontAwesome Icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRight, faAngleDoubleRight)


import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { SUCCESS } from 'app/shared/reducers/action-type.util';


const BucketCard = ({ bucket, bucketsList, match, getEntities, alert, setAlert }) => {




    const [ expanded, setExpanded ] = useState(false)
    const [ open, setOpen ] = useState(false)

    // Send Products
    // const [ submitSuccess, setSubmitSuccess ] = useState({ state: false, message: ''})

    const [ selectedBucket, setSelectedBucket ] = useState('')
    const [ quantity, setQuantity ] = useState('')
    const [ selectedState, setSelectedState ] = useState('')


    // Event handlers

    const _handleClickOpen = () => {
        setOpen(true);
      };
    
      const _handleClose = () => {
        setQuantity('')
        setSelectedBucket('')
        setSelectedState('')
        setOpen(false);
      };


    const _handleChangeState = e => {
      setSelectedState(e.target.value)
     // console.log(e.target.value)
    }

    const _handleChangeBucket = e => {
      setSelectedBucket(e.target.value)
      // console.log(e.target.value)

    }

    const _handleQuantity = e => {
      setQuantity(e.target.value)
     // console.log(e.target.value)

    }

    const _handleSubmit = async () => {
    // _handleClose()
    //    console.log('CurrenState', selectedBucket, selectedState, quantity)

        if(selectedState === '' || selectedBucket === '' || quantity === '') {
          setAlert({
            state: 'error',
            status: true,
            message: 'Todos los campos son requeridos'
          })
          return
        }

        if(quantity <= bucket[selectedState]) {
          const buck = bucketsList.find(b => b.id === selectedBucket)
          if(buck && buck.product && bucket.product && buck.product.name && buck.product.name === bucket.product.name ) {
            try {
              const newQuantityBuk = Number(quantity) + Number(buck[selectedState])
              const newBuck = {
                ...buck,
                [selectedState]: newQuantityBuk
              }
  
              const response = await axios.put('/api/product-buckets', newBuck)  
  
              if(response.status === 200) {
                const newQuantityBuket = Number(bucket[selectedState]) - Number(quantity) 
                const newBucket = {
                  ...bucket,
                  [selectedState]: newQuantityBuket
                }
  
                const res = await axios.put('/api/product-buckets', newBucket)

                if(res.status === 200) {
                  setAlert({
                    state: 'success',
                    status: true,
                    message: 'Envio realizado exitosamente!'
                  })

                 await getEntities()
                _handleClose()
                }

              }
            } catch (error) {
              // console.log(error)
            }

          }  else {
              if(buck) {
                setAlert({
                  state: 'error',
                  status: true,
                  message: 'El bucket posee otro producto o no tiene producto'
                })
                
              }
            }
        }
        else {
          setAlert({
            state: 'error',
            status: true,
            message: 'La cantidad que quiere enviar es mayor a la que posee el bucket'
          })
          return
        }
    }


    // Effects

    
    useEffect(()=>{
      // console.log('ALERT', alert)
   }, [ alert ])

   useEffect(()=>{
       if(alert.state) {
           setTimeout(
               () => {setAlert({ state: '', status: false, message: ''})
             },
               3000
           )
       }
   }, [ alert ])


    return ( 

        <Grid item xs={6} sm={3}>  {/*  ver tomorrow*/}
            <Card className='card-item' >
                <CardContent className='content ligth'>
                 <Typography component='h4' variant='h6' >
                    Nro de Bucket: # <span className='bucket-number'>{ bucket.id }</span>
                 </Typography>
                 <Typography component='h4' variant='h6' >
                    Producto: <span>{ bucket.product ? bucket.product.name : 'No tiene Producto' }</span> 
                 </Typography>   
                </CardContent>
                <CardContent className=''>
                <Typography component='h5' variant='h4' className='subtitle-card'>
                   STOCK
                 </Typography>
                 <ul className='list-quantities'>
                 <li  className='quantity-prod subtitle-list' >
                    <section className=''>
                      Estado
                    </section>
                    <section>
                      Cantidad
                    </section>
                  </li>
                  <li  className='quantity-prod' >
                      <section>
                      Disp. para Venta
                    </section>
                    <section>
                      { bucket.availableToSellQuantity || 0 } u
                    </section>
                  </li>
                  <li  className='quantity-prod' >
                    <section>
                        Encargados
                    </section>
                    <section>
                      { bucket.inChargeQuantity || 0 } u
                    </section>
                  </li>
                  <li  className='quantity-prod' >
                    <section>
                      Rotos
                    </section>
                    <section>
                      { bucket.brokenQuantity || 0 } u
                    </section>
                  </li>
                  <li  className='quantity-prod total-list' >
                    <section>
                      Total
                    </section>
                    <section>
                      { bucket ? (Number(bucket.brokenQuantity) + Number(bucket.inChargeQuantity) + 
                        Number(bucket.availableToSellQuantity)) : 0 } u
                    </section>
                  </li>
                 </ul>   
                </CardContent>
                <CardContent>
                <div>
                  <Button onClick={ _handleClickOpen }  fullWidth className='btn-send' >
                    Enviar Productos a otro Bucket &nbsp;
                    <FontAwesomeIcon icon='angle-double-right' style={{fontSize: '1.2rem'}} />
                  </Button>
                  <div className='btn-link-container'>
                    <ButtonLink tag={Link} to={`${match}/${bucket.id}/edit`} color="primary" className='btn-link'>
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Editar</Translate>
                      </span>
                    </ButtonLink>
                    <ButtonLink tag={Link} to={`${match}/${bucket.id}/delete`} className='btn-link' color="danger" >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Eliminar</Translate>
                      </span>
                    </ButtonLink>
                  </div>
                  <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={ _handleClose }>
                    <DialogTitle>Complete las opciones de envío</DialogTitle>
                        <DialogContent className='dialog'>
                          <form className='form-container'>
                              <FormControl className='form-control-dialog'>
                                  <InputLabel id='label-state'>Estado</InputLabel>
                                  <Select
                                      labelId='label-state'
                                      id='state'
                                      value={selectedState}
                                      onChange={ _handleChangeState }
                                      input={<Input />} >
                                      <MenuItem value=''>
                                          <em>Elije el estado de los productos que quieres enviar</em>
                                      </MenuItem>
                                      <MenuItem value={'availableToSellQuantity'}>
                                          Disp. para venta
                                      </MenuItem>
                                      <MenuItem value={'inChargeQuantity'}>
                                          Encargados
                                      </MenuItem>
                                      <MenuItem value={'brokenQuantity'}>
                                          Rotos
                                      </MenuItem>
                                  </Select>
                              </FormControl>
                              <FormControl className='form-control-dialog' >
                                <TextField
                                  id="quantity"
                                  label="Cantidad"
                                  type="number"
                                  value={ quantity }
                                  onChange={ _handleQuantity }
                                  InputLabelProps={{
                                  shrink: true }} />
                              </FormControl>
                              <FormControl className='form-control-dialog'>
                                  <InputLabel id='label-bucket'>Bucket al que envía</InputLabel>
                                  <Select
                                      labelId='label-bucket'
                                      id='bucket'
                                      value={selectedBucket}
                                      onChange={ _handleChangeBucket }
                                      input={<Input />} >
                                        {
                                            bucketsList.map(buck => (
                                              <MenuItem key={buck.id} value={buck.id}>
                                                  { buck.id }
                                              </MenuItem>
                                            ))
                                        }
                                  </Select>
                              </FormControl>
                          </form>
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={ _handleClose } color="primary">
                              Salir
                          </Button>
                          <Button onClick={ _handleSubmit } color="primary">
                              Enviar
                          </Button>
                          </DialogActions>
                      </Dialog>
                </div>
                </CardContent> 
            </Card>
        </Grid>
 );
}

export default BucketCard;
/*
<CardContent className=''>
<Typography component='h5' variant='h4' className='subtitle-card'>
   Productos
 </Typography>
 <Typography component='section' className='quantity-prod' >
    <section>
    Disp. para Venta
   </section>
   <section>
     { bucket.availableToSellQuantity || 0 } u
   </section>
 </Typography>
 <Typography component='section' className='quantity-prod' >
   <section>
      Encargados
   </section>
   <section>
     { bucket.inChargeQuantity || 0 } u
   </section>
 </Typography>
 <Typography component='section' className='quantity-prod' >
   <section>
     Rotos
   </section>
   <section>
     { bucket.brokenQuantity || 0 } u
   </section>
 </Typography>   
</CardContent> */