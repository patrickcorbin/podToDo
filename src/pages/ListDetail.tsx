import { IonBackButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { cart, checkmarkCircle } from 'ionicons/icons';
import './ListDetail.css';

import { useGetItems, updateItem, useUpdateItem } from '../hooks/useGetItems';
import { useEffect } from 'react';
import ListItem from '../components/ListItem';

const Tab3: React.FC = () => {

    const { id } = useParams<{ id: any }>()

    const { data: items, refetch } = useGetItems(id)

    // console.log('page load')

    const handleCheck = async (itemId: number, item: any) => {
        updateItem(itemId, {
            ...item,
            is_checked: !item.is_checked
        })
    }

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
        <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
            </IonToolbar>
        </IonHeader>
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
        </IonContent>
    </IonPage>
    );
};

export default Tab3;