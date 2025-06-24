import React from 'react';
import UserApplicationTable from './UserApplicationTable';
import UserEquipmentTable from './UserEquipmentTable';

const initialEquipmentRows = [
  { id: 1, tnaim: 'Горное', vnaim: 'Шнур 16-прядный 6мм', kolich: 14, zenaz: 100, zenapr: 10 },
  { id: 2, tnaim: 'Горное', vnaim: 'Карабин "Ринг"(сталь)', kolich: 3, zenaz: 200, zenapr: 20 },
  { id: 3, tnaim: 'Водное', vnaim: 'Заглушка', kolich: 6, zenaz: 300, zenapr: 30 },
  { id: 4, tnaim: 'Водное', vnaim: 'Байдарка "Таймень"', kolich: 7, zenaz: 4000, zenapr: 40 },
];

const initialApplicationRows = [
  { id: 1, vnaim: 'Шнур 16-прядный 6мм', kolich: 14, zenaz: 100, zenapr: 10, sost: null },
  { id: 2, vnaim: 'Карабин "Ринг"(сталь)', kolich: 3, zenaz: 200, zenapr: 20, sost: null },
  { id: 3, vnaim: 'Заглушка', kolich: 6, zenaz: 300, zenapr: 30, sost: 'Заглушка' },
];

export default function MainTables() {
  const [equipmentRows, setEquipmentRows] = React.useState(initialEquipmentRows);
  const [applicationRows, setApplicationRows] = React.useState(initialApplicationRows);

  const addToApplication = (equipmentItem) => {
    const exists = applicationRows.some(row => row.vnaim === equipmentItem.vnaim);
    if (!exists) {
      const newId = applicationRows.length > 0 ? Math.max(...applicationRows.map(r => r.id)) + 1 : 1;
      const newRow = {
        id: newId,
        vnaim: equipmentItem.vnaim,
        kolich: equipmentItem.kolich,
        zenaz: equipmentItem.zenaz,
        zenapr: equipmentItem.zenapr,
        sost: null,
      };
      setApplicationRows(prev => [...prev, newRow]);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <UserEquipmentTable
        rows={equipmentRows}
        setRows={setEquipmentRows}
        onAddToApplication={addToApplication}
      />
      <UserApplicationTable
        rows={applicationRows}
        setRows={setApplicationRows}
      />
    </div>
  );
}
