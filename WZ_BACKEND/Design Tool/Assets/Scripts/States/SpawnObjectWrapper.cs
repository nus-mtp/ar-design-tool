using UnityEngine;
using System.Collections;

public class SpawnObjectWrapper : MonoBehaviour {
    
    public int indexToSpawn;

    public  ObjectCollection objectCollection;
	// Use this for initialization
    void Start()
    {
       GameObject controlScripts =  GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
       objectCollection = controlScripts.GetComponent<ObjectCollection>();
    }
	public void SpawnObjectAtIndex(){
        objectCollection.SpawnObject(indexToSpawn);
    }
}
