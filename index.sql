CREATE INDEX idx_sales_projectcreation_id ON public.sales_projectcreation (id);
CREATE INDEX idx_study_material_delivery_id ON public.studymanage_studymaterialdeliverydetails (study_material_delivery_id);
CREATE INDEX idx_study_material_delivery_project_id ON public.studymanage_studymaterialdelivery (project_id);
CREATE INDEX idx_study_material_delivery_verification_id ON public.studymanage_studymaterialdelivery (verification_id);
CREATE INDEX idx_study_material_delivery_recipient_name_id ON public.studymanage_studymaterialdelivery (recipient_name_id);
CREATE INDEX idx_study_material_delivery_supplier_courier_id ON public.studymanage_studymaterialdelivery (supplier_courier_id);
CREATE INDEX idx_study_material_delivery_supplier_name_id ON public.studymanage_studymaterialdelivery (supplier_name_id);
CREATE INDEX idx_study_material_delivery_delivered_id ON public.studymanage_studymaterialdelivery (delivered_id);
CREATE INDEX idx_study_material_delivery_delivery_date ON public.studymanage_studymaterialdelivery (delivery_date DESC);
CREATE INDEX idx_studymaterialdeliverydetails_delivery_id ON public.studymanage_studymaterialdeliverydetails (study_material_delivery_id);
CREATE INDEX idx_wareshouse_warehousecreation_id ON wareshouse_warehousecreation (id);
CREATE INDEX idx_wareshouse_storagezonecreation_id ON wareshouse_storagezonecreation (id);
CREATE INDEX idx_wareshouse_zonelevelcreation_id ON wareshouse_zonelevelcreation (id);
CREATE INDEX idx_wareshouse_shelfcreationdetails_id ON wareshouse_shelfcreationdetails (id);
CREATE INDEX idx_inventory_goodsacceptancedetails_goods_acceptance_id ON inventory_goodsacceptancedetails (goods_acceptance_id);

