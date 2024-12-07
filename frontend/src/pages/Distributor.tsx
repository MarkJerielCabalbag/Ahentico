import AddDistributor from "@/components/modal/AddDistributor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Distributor = () => {
  const [addDistributorModal, setAddDistributorModal] = useState(false);

  const handleOpenAddDistributorModal = () =>
    setAddDistributorModal(!addDistributorModal);

  return (
    <div>
      <Button onClick={handleOpenAddDistributorModal}>Add Distributor</Button>
      {addDistributorModal && (
        <AddDistributor
          open={addDistributorModal}
          onOpenChange={setAddDistributorModal}
        />
      )}
    </div>
  );
};

export default Distributor;
