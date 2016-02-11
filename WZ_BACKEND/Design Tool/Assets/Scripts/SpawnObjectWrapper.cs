using UnityEngine;
using System.Collections;

public class SpawnObjectWrapper : MonoBehaviour {

    const string CONTROL_SCRIPT_TAG = "ControlScripts";
    public int indexToSpawn;

    public  ObjectCollection objectCollection;
	// Use this for initialization
    void Start()
    {
       GameObject controlScripts =  GameObject.FindGameObjectWithTag(CONTROL_SCRIPT_TAG);
       objectCollection = controlScripts.GetComponent<ObjectCollection>();
    }
	public void SpawnObjectAtIndex(){
        objectCollection.SpawnObject(indexToSpawn);
    }
}
