using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System;
using Vuforia;
using LitJson;

public class PillTouchListener : AbstractTouchListener {
    string[] thingsToSpawn;
    List<GameObject> buttons = new List<GameObject>();
    private const string buttonName = "Default button";
    private const string nextScene = "Choose an ingredient";
    void Start()
    {
        readJson();
    }
	
	public override void touchHandler()
	{
		Debug.Log("hey, i am pill");
		spawnIngredientButtons();
		gameObject.SetActive (false);
        addToUndo();
	}

    public override void undo()
    {
        gameObject.SetActive(true);
        foreach (GameObject b in buttons)
        {
            Destroy(b);
        }
        buttons = new List<GameObject>();
    }

    public override string getNextSceneName()
    {
        return nextScene;
    }
	
	public void spawnIngredientButtons()
	{
		for (int i=0; i<thingsToSpawn.Length; i++) {
            buttons.Add(loadPrefabs(buttonName, thingsToSpawn[i]));
		}
        Renderer rend  = buttons[0].GetComponent<Renderer>();
        Vector3 size = rend.bounds.size;
        int columns = 2;

        for (int i = 0; i < thingsToSpawn.Length; i++)
        {
            
            GameObject current = buttons[i];
            Vector3 translateVector = new Vector3(size.x * 1.0f * (i% columns - (float)columns/2.0f ) * 1.25f, size.x * 1.0f * (i / columns) * 0.75f, 0f);
            current.transform.Translate(translateVector);
            TextMesh textMesh = current.GetComponentInChildren<TextMesh>();
            textMesh.text = thingsToSpawn[i];

        }
	}

    private GameObject loadPrefabs(string prefabName, string objectName)
	{
		GameObject instance = Instantiate(Database.loadPrefab(prefabName));
		GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
		instance.transform.SetParent(tagged[0].transform,false);
		instance.name = objectName;
		return instance;
	}

    private void readJson()
    {
        string jsonString = Database.readJSON(gameObject.name);
        thingsToSpawn = JsonMapper.ToObject<string[]>(jsonString);
        Debug.Log(thingsToSpawn);
    }
}
