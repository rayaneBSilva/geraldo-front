import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useAuth } from "../../context/authContext";
import vehicheComponentService, {
  ComponentData,
} from "../../services/VehicheComponentService";
import { ComponentVehicleProps } from ".";
import { FontAwesome } from "@expo/vector-icons";
import { historyComponentStyles } from "./HistoryComponentStyles";

interface HistoryItem {
  id: number;
}

interface Props {
  data: HistoryItem[];
}

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "white",
      }}
    />
  );
};

const HistoryComponentForm = ({
  componentData,
}: {
  componentData: ComponentVehicleProps;
}) => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const { authState } = useAuth();

  useEffect(() => {
    (async () => {
      if (authState?.token) {
        const components = await vehicheComponentService.getHistoryComponent(
          authState.token,
          componentData.componentId
        );
        // const components: ComponentData[] = [
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 1,
        //     kilometersLastExnchange: 50000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 2,
        //     kilometersLastExnchange: 1000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 3,
        //     kilometersLastExnchange: 3000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 4,
        //     kilometersLastExnchange: 50000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 5,
        //     kilometersLastExnchange: 1000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 6,
        //     kilometersLastExnchange: 3000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 5,
        //     kilometersLastExnchange: 1000,
        //   },
        //   {
        //     dateLastExchange: "2024-04-10",
        //     maintenanceFrequency: 6,
        //     kilometersLastExnchange: 3000,
        //   },
        // ];
        const addIdToComponents = (components: ComponentData[]) => {
          return components.map((component, index) => {
            return { id: `item-${index + 1}`, ...component };
          });
        };

        const componentsWithIds = addIdToComponents(components);
        setComponents(componentsWithIds);
      }
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={components}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({ item }) => {
          return (
            <View style={historyComponentStyles.historyItem}>
              <FontAwesome
                name="gear"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
              <View style={historyComponentStyles.detailsContainer}>
                <View style={historyComponentStyles.detailRow}>
                  <Text style={historyComponentStyles.label}>
                    Data de troca:
                  </Text>
                  <Text style={historyComponentStyles.value}>
                    {item.dateLastExchange}
                  </Text>
                </View>
                <View style={historyComponentStyles.detailRow}>
                  <Text
                    style={[
                      historyComponentStyles.label,
                      historyComponentStyles.backgroundBlue,
                    ]}
                  >
                    Km até a troca:
                  </Text>
                  <Text style={historyComponentStyles.value}>
                    {item.kilometersLastExnchange}
                  </Text>
                </View>
                <View style={historyComponentStyles.detailRow}>
                  <Text style={historyComponentStyles.label}>Lembretes:</Text>
                  <Text style={historyComponentStyles.value}>
                    {item.maintenanceFrequency}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default HistoryComponentForm;
