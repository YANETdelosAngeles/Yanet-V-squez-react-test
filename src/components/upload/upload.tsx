import './upload.css'
import React, { useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {upload, fetchImages} from './storage/firebaseConfig';

const Upload = () => {
    const [imagesURL, setImagesURL]=useState([{}])
    const [previews, setPreviews] = useState([{}])
    const [succesLoadImage, setSuccesLoadImage] = useState(0)
    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        accept: {
            'image/png': [],
            'image/jpg': [],
            'image/jpeg': []
        },
        noClick: true,
        noKeyboard: true,
        onDrop: (acceptedFiles) => (
            setPreviews(acceptedFiles.map(file => 
                Object.assign({preview: URL.createObjectURL(file)})
            ))
        ),

      });

      useEffect(() => {
        getImages()

        setTimeout(()=>{
          setSuccesLoadImage(0)
        }, 2000)
      }, [succesLoadImage]);

      const files = acceptedFiles.map((file) => (
        <>
        <li key={file.name}>
          {file.name}  {file.size} bytes
        </li>
        </>
      ));

      const uploadImages=()=>{
        // eslint-disable-next-line array-callback-return
        acceptedFiles.map((file:File) =>  {
            try {
              upload(file) 
              setSuccesLoadImage(1)
              setPreviews([{}])
            } catch (error) {
              console.error('error al subir imagenes')
              setSuccesLoadImage(2)
              setPreviews([{}])
            }
          }
        );
      }

      const getImages = async () => {
        const urls = await fetchImages('/');
        setImagesURL(urls)
      };
    
      const LoaderImages = (
        <>
        <button type="button"className="btn btn-success" onClick={uploadImages}>
            Subir Imagenes
        </button>
        </>
      )

      const showAllImages = imagesURL.map((file,index) => (
        <>
            <div className={index===0? 'carousel-item active': 'carousel-item'} key={Object.values(file).join('')}>
                <img className="d-block w-100" alt='imagen cargada' src={Object.values(file).join('')} />
            </div>
        </>
      ))

      const showPreview = previews.map((file) => (
        <>
            <div className="thumb" key={Object.values(file).join('')}>
                <div className="thumbInner">
                    <img alt='imagen cargada'
                        src={Object.values(file).join('')}
                        className="img"
                        />
                </div>
            </div>
        </>
      ))
    
      return (
        <div className="container lead mx-auto">
          <div {...getRootProps({className: 'card text-center'})}>
            <input {...getInputProps()} />
            <div>
              <p className='card-header'>Arrastra y suelta algunos archivos aquí</p>
              {JSON.stringify(previews)==='[{}]'? null : showPreview}
            </div>
            <div className='card-title'>
              <p className='card-text'> Solo se aceptan .jpeg .jpg .png</p>
              <button type="button" className="btn btn-primary" onClick={open}>
                Abrir desde mi computadora
              </button>
            </div>
          </div>
          <div>
            <div className='card-footer text-muted'>
              <h4>Información archivos</h4>
              <ul>{
                  acceptedFiles.length===0 || JSON.stringify(previews)==='[{}]'? 
                        <div className='card-subtitle'> 
                          <h6> aún no hay archivos cargados</h6>
                        </div> 
                        :
                        files
                  }
              </ul>
            </div>
            {JSON.stringify(previews)==='[{}]'? null: LoaderImages}
            { succesLoadImage===1?
                          <div className="alert alert-success" role="alert">
                              se subio correctamente
                          </div>
            :succesLoadImage===2?
                          <div className="alert alert-danger " role="alert">
                              ocurrio un error al subir las imagenes
                          </div>
            :null
             }
          </div> 
          <div className='all-images'>
              <h4 className='card-footer text-muted text-center'>Todas tus imagenes</h4>
              { JSON.stringify(imagesURL)==='[]'? 
                <div className='card-footer text-muted '> 
                    <h6 className='card-subtitle text-center'> aún no hay archivos cargados</h6>
                </div> 
              : 
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                      {showAllImages}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              }
          </div>
        </div>
      );    
}

export default Upload;
