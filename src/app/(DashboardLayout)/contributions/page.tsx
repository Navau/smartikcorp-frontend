'use client';
import React from 'react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { Button, Typography } from '@mui/material';
import { BasicModal } from '../components/shared';
import { ContributionForm } from '../components/contributions';

export default function Contributions() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onRefetch = () => {};

  return (
    <PageContainer title="Quotes" description="this is Contributions">
      <DashboardCard title="Quotes">
        <div className="flex">
          <Button
            variant="contained"
            size="large"
            className="ml-auto"
            onClick={handleOpen}
          >
            Add Quote
          </Button>
          <BasicModal
            show={open}
            size="80%"
            onClose={handleClose}
            title="Add Quote"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <ContributionForm onClose={handleClose} onRefetch={onRefetch} />
            </Typography>
          </BasicModal>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
