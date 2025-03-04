import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { appWindow } from "@tauri-apps/api/window";
import { Outlet } from "react-router-dom";
import { StoreContext } from "./context";
import { ChannelList } from "./components/ChannelList";
import { useStore } from "./hooks/useStore";
import * as dataAgent from "./helpers/dataAgent";
import styles from "./App.module.css";
import "./styles/index.global.scss";
import "./App.css";
import { Article } from "./db";
import { busChannel } from "./helpers/busChannel";

function App() {
	const store = useStore();

	const [filter, setFilter] = useState({ ...store.currentFilter });
	const [article, setArticle] = useState(store.article);
	const [currentIdx, setCurrentIdx] = useState(-1);
	const [channel, setChannel] = useState(store.channel);
	const [articleList, setArticleList] = useState(store.articleList);

	const updateArticleAndIdx = (article: Article, idx?: number) => {
		if (idx === undefined || idx <= 0) {
			idx = articleList.findIndex((item) => item.uuid === article.uuid);
		}

		setCurrentIdx(idx);
		setArticle(article);

		if (article.read_status === 1) {
			dataAgent.updateArticleReadStatus(article.uuid, 2).then((res) => {
				if (res) {
					busChannel.emit("updateChannelUnreadCount", {
						uuid: article.channel_uuid,
						action: "decrease",
						count: 1,
					});

					article.read_status = 2;

					setArticle(article);
				}
			});
		}
	};

	useEffect(() => {
		document
			.getElementById("titlebar-minimize")
			?.addEventListener("click", () => appWindow.minimize());
		document
			.getElementById("titlebar-maximize")
			?.addEventListener("click", () => appWindow.toggleMaximize());
		document
			.getElementById("titlebar-close")
			?.addEventListener("click", () => appWindow.close());
	}, []);

	useEffect(() => {
		dataAgent.getUserConfig().then((res) => {
			console.log("user config", res);
		});
	}, []);

	const goPrev = (elem: HTMLElement, tagName: string) => {
		if (tagName === "a") {
		} else if (tagName === "li") {
			busChannel.emit("goPreviousArticle");
		}

		elem.scrollIntoView({ behavior: "smooth" });
	};

	const goNext = (elem: HTMLElement, tagName: string) => {
		if (tagName === "a") {
		} else if (tagName === "li") {
			busChannel.emit("goNextArticle");
		}

		elem.scrollIntoView({ behavior: "smooth" });
	};
	const handleKeyPress = (event: React.KeyboardEvent) => {
		const activeElement = document.activeElement as HTMLElement;
		const tagName = activeElement.tagName.toLowerCase();

		switch (event.key) {
			case "ArrowDown":
			case "j":
				goNext(activeElement, tagName);
				break;
			case "ArrowUp":
			case "k":
				goPrev(activeElement, tagName);
				break;
			default:
				break;
		}
		console.log("event", event);
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<StoreContext.Provider
			value={{
				channel: channel,
				setChannel,
				article: article,
				updateArticleAndIdx,
				articleList: articleList,
				setArticleList,
				setArticle,
				currentIdx,
				setCurrentIdx,
				filterList: store.filterList,
				currentFilter: filter,
				setFilter,
			}}
		>
			<DndProvider backend={HTML5Backend}>
				<div className={styles.container}>
					<ChannelList />
					<Outlet />
				</div>
			</DndProvider>
		</StoreContext.Provider>
	);
}

export default App;
