import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonSkeletonText, IonToolbar, IonModal, useIonViewDidLeave, useIonModal, IonInput, IonTextarea, useIonViewWillEnter } from '@ionic/react';
import { useParams } from 'react-router';
import { addCircleOutline, cart, checkmarkCircle } from 'ionicons/icons';
import './ListDetail.css';

import { useGetItems, updateItem, useUpdateItem, insertItem } from '../hooks/useGetItems';
import { useEffect, useRef, useState } from 'react';
import ListItem from '../components/ListItem';
import { useGetList } from '../hooks/useGetLists';

import ItemModalInsert from '../components/ItemModalInsert';

const Tab3: React.FC = () => {

    // useIonViewWillEnter(() => console.log('page load'))

    const { id } = useParams<{ id: any }>()

    const { data: list } = useGetList(id)

    const { data: items, refetch } = useGetItems(id)

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [currentItem, setCurrentItem] = useState()

    const [present, dismiss] = useIonModal(ItemModalInsert, {
        dismiss: () => dismiss(),
        listId: parseInt(id)
    })

    const modalOptions = {
        onDidDismiss: () => {
            // refetch()
            dismiss()
        },
        breakpoints: [0, .25, 0.5, 0.75, 1],
        initialBreakpoint: .5,
        backdropBrealpoint: .2
    }

    // useIonViewDidLeave(() => refetch())

    const itemDisplay = items?.map(item => (
        <ListItem 
            key={item.id}
            item={item}
            refetch={refetch}
        />
    ))

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton text="Back" defaultHref='/app/lists' />
            </IonButtons>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonItem 
            className="background-white list__name"
            lines='none'
        >
            <IonIcon icon={list?.list_type === 'grocery' ? cart : checkmarkCircle} slot='start' /> 
            {list?.name}
        </IonItem>
        <IonList>
            {
                items ? 
                itemDisplay :
                <>
                    <IonItem>
                        <IonSkeletonText animated={true} style={{ 'width': '40%' }}></IonSkeletonText>
                    </IonItem>
                    <IonItem>
                        <IonSkeletonText animated={true} style={{ 'width': '40%' }}></IonSkeletonText>
                    </IonItem>
                </>
            }
        </IonList>
        <IonButton
            id="open-modal"
            expand='block'
            onClick={() => {
                // refetch()
                present(modalOptions)
            }}
        >
            <IonIcon icon={addCircleOutline} /> 
        </IonButton>
        </IonContent>
    </IonPage>
    );
};

export default Tab3;