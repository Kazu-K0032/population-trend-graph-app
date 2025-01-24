import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PrefList from "../feature/front/PrefList";
import CustomSelector from "../feature/CustomSelector";
import * as React from "react";
import ModeChart from "../feature/ModeChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Main() {
  // 選択された都道府県コードの配列
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  // 選択された都道府県の人口データ一覧
  const [populationList, setPopulationList] = useState<PopulationData[]>([]);
  // グラフモードを管理する
  const [sortOption, setSortOption] = useState<string>("");
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <main className="l-main">
        <div className="l-main__inner">
          <div className="l-sectionWrap">
            <section className="l-section">
              <h2 className="c-mainTtl">都道府県</h2>
              <PrefList
                selectedPrefCodes={selectedPrefCodes}
                setSelectedPrefCodes={setSelectedPrefCodes}
                setPopulationList={setPopulationList}
                addClass="--homePage"
              />
            </section>

            {selectedPrefCodes.length > 0 ? (
              <section className="l-section">
                <h2 className="c-mainTtl">グラフ</h2>
                <CustomSelector<SelectItemProps>
                  id="mode-select"
                  label="モード"
                  value={sortOption}
                  options={[
                    { label: "総人口", value: "total-population" },
                    { label: "年少人口", value: "juvenile-population" },
                    { label: "生産年齢人口", value: "working-age-population" },
                    { label: "老年人口", value: "elderly-population" },
                  ]}
                  onChange={handleSortChange}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  wrapperClassName="l-selector"
                  className="l-selector__select"
                />
                <div>
                  <ModeChart
                    populationList={populationList}
                  />
                </div>
              </section>
            ) : (
              <section className="l-section">
                <h2 className="c-mainTtl">都道府県を選択してください</h2>
                <CustomSelector<SelectItemProps>
                  id="mode-select"
                  label="モード"
                  value={sortOption}
                  options={[
                    { label: "総人口", value: "total-population" },
                    { label: "年少人口", value: "juvenile-population" },
                    { label: "生産年齢人口", value: "working-age-population" },
                    { label: "老年人口", value: "elderly-population" },
                  ]}
                  onChange={handleSortChange}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  wrapperClassName="l-selector"
                  className="l-selector__select"
                />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
