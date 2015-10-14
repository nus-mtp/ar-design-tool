using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System;
using Vuforia;
using LitJson;

public class PillTouchListener : AbstractTouchListener {
	string[] thingsToSpawn = {"vitamins"};
	
	public override void touchHandler()
	{
		Debug.Log("hey, i am pill");
		spawnIngredientGroupsButton();
		gameObject.SetActive (false);
	}   	
	
	public void spawnIngredientGroupsButton()
	{
		for (int i=0; i<thingsToSpawn.Length; i++) {
			loadPrefabs (thingsToSpawn [i]);
			
		}
	}
	
	private GameObject loadPrefabs(string prefabName)
	{
		GameObject instance = Instantiate(Database.loadPrefab(prefabName));
		GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
		instance.transform.SetParent(tagged[0].transform,false);
		instance.name = prefabName;
		return instance;
	}
}
