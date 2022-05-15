import React, {useMemo} from 'react';
import {View} from 'react-native';
// import from library
// import from alias
import {ProductSectionList} from '@native/components';
import {useTheme} from '@app/shared/hooks/useTheme';
// localImport
import {useOrderConfirmationModel} from './order-confirmation.hook';
import {OrderConfirmationProps} from './order-confirmation.type';
import {styles} from './order-confirmation.style';
import {CustomerInformation} from './components';

const _OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
  const theme = useTheme();
  const {} = useOrderConfirmationModel();

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colorScheme.surface,
      },
    ];
  }, [theme]);

  const listHeaderComponent = CustomerInformation;

  return (
    <View style={containerStyle}>
      <ProductSectionList
        sections={SECTIONS}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  );
};

export const OrderConfirmation = React.memo(_OrderConfirmation);

const SECTIONS = [
  {
    title: 'Kho Thanh Xuân',
    data: [
      {
        id: 1,
        name: 'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
        price: '100.000đ',
        totalPrice: '500.000đ',
        coinPrice: '100 MV',
        quantity: 3,
        image:
          'https://s3-alpha-sig.figma.com/img/d8fc/8e23/c89c6e8f17afe38d20ac39a308a24b4d?Expires=1653264000&Signature=dEMlXR0FTabXEsDAd4nQpLrTPhrC9C0bzBwbSHsDJVrXkO81X4IAGWL743l86F8m0r1FASc6QnpsKlCmjxQdYIXCZ9T1cLs6ixa4fImd~~QVE2s6DI6ZuCKsZUrPcK76Bptm~B745ongH8iG1wAtGu1ICRuTXlg2dxNNAWyX49CzbakrRdSBQiJLSPQDpmrY6U2uG-DkkLIzIAWz6xdGIQf0~Yu87sKv0PR-MzR1UIPFAoiF5bbn0Q~UCXTdKZbRKRbe4wNQrig0a6it~VtYRGDxjlcUzJH7dMrkpAwPaFKRGMwViY4GZgfuoB6ofNCBP~O~~Q0pew2xdqRNhkreWQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        id: 2,
        name: 'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
        price: '100.000đ',
        totalPrice: '500.000đ',
        coinPrice: '100 MV',
        quantity: 3,
        image:
          'https://s3-alpha-sig.figma.com/img/f4ff/7bf9/2bf28b416d5413f9f5a86a8b24c7b1cb?Expires=1653264000&Signature=eaiinLRiHoTzS6jolVZydormu5Ctu8cQ7iAEH6E3tEyrqsD~CEbBj5gXmFou0bqgWSbhmxdZBCoU2t~QrsA3Co4A9E5Xx9-BOmntcwRo2gk6ka3Wo142bE2TrDVgl3F-WJhDVjgGKu4Pz9iFdQj0gmyE-xCen7IautCgf5wuUecwRz1VYv~33LhN7ADA8NqzNP6Eb6hn3dOSVyb49AqrD9E-eiOQb2VRcYa3dbe1~xMlD527cJtjNZLB-aal9~3NB6u3mfhYBW97CZtB2oLk5e~X8KLXkNhcLXWU54LNA9Sv7IkbIAkz5v6HuXS5SjRgjdPN38FbWrcwvDev3B~42g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
    ],
  },
  {
    title: 'Kho Long Biên',
    data: [
      {
        id: 3,
        name: 'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
        price: '100.000đ',
        totalPrice: '500.000đ',
        coinPrice: '100 MV',
        quantity: 3,
        image:
          'https://s3-alpha-sig.figma.com/img/d8fc/8e23/c89c6e8f17afe38d20ac39a308a24b4d?Expires=1653264000&Signature=dEMlXR0FTabXEsDAd4nQpLrTPhrC9C0bzBwbSHsDJVrXkO81X4IAGWL743l86F8m0r1FASc6QnpsKlCmjxQdYIXCZ9T1cLs6ixa4fImd~~QVE2s6DI6ZuCKsZUrPcK76Bptm~B745ongH8iG1wAtGu1ICRuTXlg2dxNNAWyX49CzbakrRdSBQiJLSPQDpmrY6U2uG-DkkLIzIAWz6xdGIQf0~Yu87sKv0PR-MzR1UIPFAoiF5bbn0Q~UCXTdKZbRKRbe4wNQrig0a6it~VtYRGDxjlcUzJH7dMrkpAwPaFKRGMwViY4GZgfuoB6ofNCBP~O~~Q0pew2xdqRNhkreWQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
      {
        id: 4,
        name: 'Viên Uống Hỗ Trợ Cải Thiện Giấc Ngủ Hush & Hush Mind Your Mind, 30 viên',
        price: '100.000đ',
        totalPrice: '500.000đ',
        coinPrice: '100 MV',
        quantity: 3,
        image:
          'https://s3-alpha-sig.figma.com/img/f4ff/7bf9/2bf28b416d5413f9f5a86a8b24c7b1cb?Expires=1653264000&Signature=eaiinLRiHoTzS6jolVZydormu5Ctu8cQ7iAEH6E3tEyrqsD~CEbBj5gXmFou0bqgWSbhmxdZBCoU2t~QrsA3Co4A9E5Xx9-BOmntcwRo2gk6ka3Wo142bE2TrDVgl3F-WJhDVjgGKu4Pz9iFdQj0gmyE-xCen7IautCgf5wuUecwRz1VYv~33LhN7ADA8NqzNP6Eb6hn3dOSVyb49AqrD9E-eiOQb2VRcYa3dbe1~xMlD527cJtjNZLB-aal9~3NB6u3mfhYBW97CZtB2oLk5e~X8KLXkNhcLXWU54LNA9Sv7IkbIAkz5v6HuXS5SjRgjdPN38FbWrcwvDev3B~42g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
      },
    ],
  },
];
