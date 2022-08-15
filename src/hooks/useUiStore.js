import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal, uiOpenModal } from '../store/slices/uiSlice';


export const useUiStore = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const dispatch = useDispatch();

    const startUiOpenModal = () => {
        dispatch( uiOpenModal() )
    }

    const startUiCloseModal = () => {
        dispatch( uiCloseModal() )
    }


    return {
        //* Propiedades
        modalOpen,

        //* Métodos
        startUiOpenModal,
        startUiCloseModal,
    }

}