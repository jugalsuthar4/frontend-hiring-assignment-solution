import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useShift from "@/hooks/use-shift";
import AvailableShifts from "./available_shifts";
import ShiftGroup from "@/components/ui/shift-group";
import { fetchShifts } from "@/actions/shifts";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const {
    dispatch,
    state: { availableShifts, bookedShift, error, success },
  } = useShift();

  useEffect(() => {
    const fetchData = () => fetchShifts()(dispatch);
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({ title: error, variant: "destructive" });
    }
    if (success) {
      toast({ title: success, variant: "default" });
    }
  }, [error, success]);
  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] flex justify-center items-start p-4 sm:p-8">
      <Tabs
        defaultValue="my_shifts"
        className="w-full max-w-4xl rounded-lg shadow-md border border-gray-300"
      >
        <TabsList className="flex">
          <TabsTrigger
            className="flex-1 data-[state=active]:text-[#014EB4]"
            value="my_shifts"
          >
            My Shifts
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:text-[#014EB4]"
            value="available_shifts"
          >
            Available Shifts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my_shifts">
          <ShiftGroup groupedShifts={bookedShift} />
        </TabsContent>
        <TabsContent value="available_shifts">
          <AvailableShifts availableShifts={availableShifts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
