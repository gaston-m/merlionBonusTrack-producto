import React, { useState, useEffect } from 'react';

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

import { Alert } from '@material-ui/lab'

const BucketCard = ({ bucket }) => {

    const [ expanded, setExpanded ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [ buckets, setBuckets ] = useState([])
    const [ submitSuccess, setSubmitSuccess ] = useState(false)

    useEffect(()=>{
        console.log('EXPANDED', expanded)
    }, [ expanded ])

    useEffect(()=>{
        if(submitSuccess) {
            setTimeout(
                () => {setSubmitSuccess(false)},
                2000
            )
        }
    }, [ submitSuccess ])

    // Event handlers

    const _handleClickOpen = () => {
        setOpen(true);
      };
    
      const _handleClose = () => {
        setOpen(false);
      };

    const _handleExpanded = e => {
        setExpanded(!expanded)
    }

    const _handleChangeState = () => {

    }

    const _handleSubmit = () => {
        _handleClose()

        setSubmitSuccess(true)


    }

    const _handleChangeBucket = () => {
        
    }

    return ( 
        <Grid item xs={4}>
            <Card className='card-item' >
                <CardContent className='content ligth'>
                 <Typography component='h4' variant='h6' >
                    Nro de Bucket: # <span>{ bucket.id }</span>
                 </Typography>
                 <Typography component='h4' variant='h6' >
                    Producto: <span>{ bucket.product ? bucket.product.name : 'No tiene Producto' }</span> 
                 </Typography>   
                </CardContent>
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
                </CardContent>
                <CardContent>
                <div>
                 <Button onClick={ _handleClickOpen }  variant='contained' color='secondary' fullWidth >
                   Enviar Productos a otro Bucket
                 </Button>
                 <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={ _handleClose }>
                   <DialogTitle>Complete las opciones de envío</DialogTitle>
                       <DialogContent className='dialog'>
                        <form className='form-container'>
                            <FormControl className='form-control-dialog'>
                                <InputLabel id='label-state'>Estado</InputLabel>
                                <Select
                                    labelId='label-state'
                                    id='state'
                                    onChange={ _handleChangeState }
                                    input={<Input />} >
                                    <MenuItem value=''>
                                        <em>None</em>
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
                                InputLabelProps={{
                                shrink: true }} />
                            </FormControl>
                            <FormControl className='form-control-dialog'>
                                <InputLabel id='label-bucket'>Bucket al que envía</InputLabel>
                                <Select
                                    labelId='label-bucket'
                                    id='bucket'
                                    value={''}
                                    onChange={ _handleChangeBucket }
                                    input={<Input />} >
                                      {
                                          buckets.map(buck => (
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
                {
                    submitSuccess ? 
                      <Alert severity="success">El envio ha sido Exitoso!</Alert>
                    :
                      null
                      /*
                      <Alert severity="error">Ups, ocurrio un error { error.message ? error.message : ''}</Alert>
                */}
            </Card>
        </Grid>
 );
}

export default BucketCard;
