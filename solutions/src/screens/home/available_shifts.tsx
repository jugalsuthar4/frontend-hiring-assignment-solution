import ShiftGroup from "@/components/ui/shift-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IGroupedShifts } from "@/model/IGroupedShifts";

const AvailableShifts = ({
  availableShifts,
}: {
  availableShifts: IGroupedShifts;
}) => {
  return (
    <Tabs
      defaultValue={Object.keys(availableShifts)[0]}
      className="w-full max-w-4xl rounded-lg shadow-md border border-gray-300"
    >
      <TabsList className="flex">
        {Object.keys(availableShifts).map((shift) => {
          return (
            <TabsTrigger
              className="flex-1 data-[state=active]:text-[#014EB4]"
              value={shift}
              key={shift}
            >
              {shift} - ({availableShifts[shift].count})
            </TabsTrigger>
          );
        })}
      </TabsList>
      {Object.keys(availableShifts).map((shift) => {
        return (
          <TabsContent value={shift}>
            <ShiftGroup
              groupedShifts={availableShifts[shift].dates}
              showArea={false}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default AvailableShifts;
