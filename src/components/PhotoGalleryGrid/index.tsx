import * as React from 'react';
import usePhotos, { ipfsProvider } from '../../ipfs/usePhotos';
import { Grid, makeStyles, RootRef } from '@material-ui/core';
import { FileContent } from 'webnative/ipfs';
import useAuth from '../Auth/useAuth';

const useStyles = makeStyles(theme => ({
    grid: {
        transition: 'max-width .2s ease-in-out'
    },
    figure: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 0,
        height: '100%',
        width: '100%',
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
    }
}));

interface Props {
    photo: FileContent
}

const Photo: React.FC<Props> = (props) => {
    const {appPath} = useAuth()
    const [big, setBig] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>();
    const toggleBig = () => {
        setBig(!big);
        setTimeout(() => {
            if (ref) {
                console.log(ref.current);
                ref.current && ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 200);
    };
    const classes = useStyles();
    return (
        <RootRef rootRef={ref}>
            <Grid item xs={big ? 12 : 6} md={big ? 12 : 3} onClick={toggleBig} className={classes.grid}>
                <figure className={classes.figure}>
                    <img
                        src={props.photo}
                        alt={''}
                        className={classes.img}
                        // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                    />
                </figure>
            </Grid>
        </RootRef>
    )
};

const PhotoGallery: React.FC = () => {
    const {photos} = usePhotos()
    if (photos !== undefined) {
        return <>{photos.map(p => {
            const url = URL.createObjectURL(p)
            return <Photo key={url} photo={url} />
        })}</>
    }

    return <></>
};

const PhotoGalleryGrid: React.FC = () =>
    <Grid container spacing={3} wrap={'wrap'}>
        <PhotoGallery/>
    </Grid>

export default PhotoGalleryGrid;
