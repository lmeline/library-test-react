import React, { useState,useEffect } from "react";
import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";
import initialLayout from "./layout/layout.json";

// =====================================================
// CRÉER LES ENFANTS
// =====================================================

function createChildren(parentId, count, level) {
  return Array.from(
    { length: count },
    (_, index) => ({
      id: `${parentId}-${index + 1}`,
      level,
    })
  );
}


function createChild(parentId, index, level) {
  return {
    id: `${parentId}-${index}`,
    level,
  };
}


// =====================================================
// DIVISER UN PANNEAU DE NIVEAU 1
// =====================================================

function splitPanel(node, targetId) {

  // ---------------------------------------------------
  // On a trouvé le panneau
  // ---------------------------------------------------

  if (node.id === targetId) {

    // -------------------------------------------------
    // Niveau 1 :
    // A ou B -> 2 panneaux
    // -------------------------------------------------

    if (node.level === 1) {

      // Évite de recréer les enfants
      // si le panneau est déjà divisé
      if (node.children) {
        return node;
      }

      return {
        ...node,

        direction: "vertical",

        children: createChildren(
          node.id,
          2,
          2
        ),
      };
    }

    // -------------------------------------------------
    // Les niveaux suivants ne sont pas gérés ici
    // -------------------------------------------------

    return node;
  }


  // ---------------------------------------------------
  // Recherche récursive
  // ---------------------------------------------------

  if (node.children) {

    return {
      ...node,

      children: node.children.map(
        (child) =>
          splitPanel(
            child,
            targetId
          )
      ),
    };
  }


  return node;
}


// =====================================================
// AJOUTER UN PANNEAU À UN NIVEAU 2
// =====================================================

function addChild(node, targetId) {

  // ---------------------------------------------------
  // On a trouvé le panneau
  // ---------------------------------------------------

  if (node.id === targetId) {

    // On ne peut ajouter des panneaux
    // que sur un niveau 2
    if (node.level !== 2) {
      return node;
    }


    const children =
      node.children || [];


    // Maximum 4 panneaux
    if (children.length >= 4) {
      return node;
    }


    // -------------------------------------------------
    // Index du nouveau panneau
    // -------------------------------------------------

    const nextIndex =
      children.length + 1;


    return {
      ...node,

      direction: "horizontal",

      children: [
        ...children,

        createChild(
          node.id,
          nextIndex,
          3
        ),
      ],
    };
  }


  // ---------------------------------------------------
  // Recherche récursive
  // ---------------------------------------------------

  if (node.children) {

    return {
      ...node,

      children: node.children.map(
        (child) =>
          addChild(
            child,
            targetId
          )
      ),
    };
  }


  return node;
}


// =====================================================
// RENDU D'UN NŒUD
// =====================================================

function RenderNode({
  node,
  onSplit,
  onAddChild,
}) {

  // ===================================================
  // PANNEAU SANS ENFANTS
  // ===================================================

  if (!node.children) {

    return (
      <Panel minSize={10}>

        <div
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            border: "1px solid #ccc",

            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            justifyContent: "center",

            gap: 10,
          }}
        >

          <strong>
            {node.id}
          </strong>


          {/* Niveau 1 : diviser en 2 */}

          {node.level === 1 && (
            <button
              onClick={() =>
                onSplit(node.id)
              }
            >
              Diviser en 2
            </button>
          )}


          {/* Niveau 2 : premier ajout */}

          {node.level === 2 && (
            <button
              onClick={() =>
                onAddChild(node.id)
              }
            >
              Ajouter un panneau
            </button>
          )}

        </div>

      </Panel>
    );
  }


  // ===================================================
  // PANNEAU AVEC ENFANTS
  // ===================================================

  return (
    <Panel minSize={10}>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >

        <Group
          orientation={
            node.direction === "horizontal"
              ? "horizontal"
              : "vertical"
          }
        >

          {node.children.map(
            (child, index) => (

              <React.Fragment
                key={child.id}
              >

                <RenderNode
                  node={child}
                  onSplit={onSplit}
                  onAddChild={onAddChild}
                />

                {index <
                  node.children.length - 1 && (

                    <Separator
                      style={{
                        width:
                          node.direction === "horizontal"
                            ? 4
                            : undefined,

                        height:
                          node.direction === "vertical"
                            ? 4
                            : undefined,

                        background: "#999",

                        cursor:
                          node.direction === "horizontal"
                            ? "col-resize"
                            : "row-resize",
                      }}
                    />

                  )}

              </React.Fragment>
            )
          )}

        </Group>


        {/* =================================================
            BOUTON AJOUTER
            Il reste visible même après le premier ajout.
            ================================================= */}

        {node.level === 2 &&
          node.children.length < 4 && (

            <button
              onClick={() =>
                onAddChild(node.id)
              }
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                zIndex: 100,
              }}
            >
              + Ajouter un panneau
            </button>

          )}


        {/* =================================================
            MAXIMUM ATTEINT
            ================================================= */}

        {node.level === 2 &&
          node.children.length >= 4 && (

            <div
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                zIndex: 100,
                fontSize: 12,
                color: "#666",
              }}
            >
              Maximum de 4 panneaux
            </div>

          )}

      </div>

    </Panel>
  );
}


// =====================================================
// APP
// =====================================================

export default function App() {

  const [layout, setLayout] = useState(() => {

    const savedLayout =
      localStorage.getItem("my-layout");

    if (savedLayout) {
      return JSON.parse(savedLayout);
    }

    return initialLayout;
  });


  useEffect(() => {

    localStorage.setItem(
      "my-layout",
      JSON.stringify(layout)
    );

  }, [layout]);


  // ===================================================
  // DIVISER NIVEAU 1
  // ===================================================

  function handleSplit(id) {

    setLayout(
      (currentLayout) =>
        splitPanel(
          currentLayout,
          id
        )
    );
  }


  // ===================================================
  // AJOUTER UN ENFANT NIVEAU 2
  // ===================================================

  function handleAddChild(id) {

    setLayout(
      (currentLayout) =>
        addChild(
          currentLayout,
          id
        )
    );
  }


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >

      <Group
        orientation="horizontal"
      >

        {layout.children.map(
          (child, index) => (

            <React.Fragment
              key={child.id}
            >

              <RenderNode
                node={child}
                onSplit={handleSplit}
                onAddChild={handleAddChild}
              />


              {index <
                layout.children.length - 1 && (

                  <Separator
                    style={{
                      width: 4,
                      background: "#999",
                      cursor: "col-resize",
                    }}
                  />

                )}

            </React.Fragment>

          )
        )}

      </Group>

    </div>
  );
}