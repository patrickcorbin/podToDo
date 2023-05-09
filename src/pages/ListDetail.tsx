import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { cart, checkmarkCircle } from 'ionicons/icons';
import './ListDetail.css';

import { useGetItems } from '../hooks/useGetItems';

const Tab3: React.FC = () => {

    const { id } = useParams<{ id: any }>()

    const { data: items } = useGetItems(id)

    const itemDisplay = items?.map(item => <h3>{item.title}</h3>)

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